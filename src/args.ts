import { execSync } from 'node:child_process'
import prompts = require('prompts')
import type { TemplateKeys } from './generator/interface'
import { log } from './utils'
import { isVersionUpdated } from './utils'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const currentPkgInfo = require('../package.json')

export async function upgradeValid(skipPrompts = false, skipUpdate = false) {
  if (skipUpdate) {
    return false
  }
  // const stopSpinner = showSpinner('检测新版本中')
  log('version', '检测新版本中...')
  // 获取最新版本
  const latestVersion = execSync(`npm show ${currentPkgInfo.name} version`, {
    encoding: 'utf-8'
  }).trim()
  // stopSpinner()
  if (isVersionUpdated(currentPkgInfo.version.trim(), latestVersion)) {
    log('upgrade', `检测到新版本 ${latestVersion}，请更新本工具`)
    if (!skipPrompts) {
      const { next } = await prompts({
        name: 'next',
        type: 'confirm',
        message: '是否仍然使用（不推荐）？'
      })
      return !next
    }
    return true
  }
  return false
}

export const helpMessage = '本工具仅用于生成项目的初始化配置使用，具体每个项目的一些配置仍然需要单独设置。'

/**
 * 命令行参数预解析
 * @param args 命令行参数列表
 */
export default async function prepareForArgs(args: string[]): Promise<
  | boolean
  | {
      template?: TemplateKeys
      modules?: string[]
      skipUpdate?: boolean
    }
> {
  const result: {
    template?: TemplateKeys
    modules?: string[]
    skipUpdate?: boolean
  } = {}

  if (args.length) {
    // help信息
    if (['-h', '--help'].includes(args[0])) {
      log(
        'help',
        `${helpMessage}
用法：${currentPkgInfo.name} [flags]
flags的值如下：
-h, --help\t\t打印帮助信息
-v, --version\t\t打印当前版本
-t, --template\t\t选择模板，可选值 default: 默认, front: 前端模板, node: NodeJs后端模板, full: 全栈模板
-m, --modules\t\t非交互模式，直接指定要生成的配置模块，多个模块用逗号分隔，例如：-m biome,browserslist,igit
--no-interactive\t非交互模式，需要配合 -m 使用
--skip-update\t\t跳过版本更新检查`
      )
      return false
    }
    // 版本信息
    if (['-v', '--version'].includes(args[0])) {
      log('version', currentPkgInfo.version)
      await upgradeValid()
      return false
    }

    // 解析所有参数
    for (let i = 0; i < args.length; i++) {
      const arg = args[i]

      // 模板
      if (['-t', '--template'].includes(arg)) {
        const templateValue = args[i + 1]
        if (['default', 'front', 'node', 'full', 'modern'].includes(templateValue)) {
          result.template = templateValue as TemplateKeys
          i++ // 跳过下一个参数
        } else {
          log('Template Error', '不支持的模板，使用默认模板')
          result.template = 'default'
        }
      }

      // 模块选择（非交互模式）
      if (['-m', '--modules'].includes(arg)) {
        const modulesValue = args[i + 1]
        // 确保 modulesValue 存在且不是下一个 flag
        if (modulesValue && !modulesValue.startsWith('-')) {
          result.modules = modulesValue
            .split(',')
            .map(m => m.trim())
            .filter(Boolean)
          i++ // 跳过下一个参数
        } else {
          log('Modules Error', '未指定模块或格式错误')
        }
      }

      // 跳过更新检查
      if (arg === '--skip-update') {
        result.skipUpdate = true
      }
    }
  }

  // 如果有任何配置，返回配置对象，否则返回 true 表示继续交互模式（但如果没有 args 其实也会走到这里，需要小心，原逻辑是 args.length > 0 才处理）
  // 实际上原逻辑是如果 args.length 为 0 返回 true。
  // Create default result if args exist but didn't match help/version
  if (args.length > 0 && Object.keys(result).length > 0) {
    return result
  }

  if (args.length > 0 && Object.keys(result).length === 0) {
    // 没有任何匹配的参数
    return true
  }

  return true
}
