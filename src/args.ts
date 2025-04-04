import { execSync } from 'node:child_process'
import prompts = require('prompts')
import type { TemplateKeys } from './generator/interface'
import { log } from './utils'
import { isVersionUpdated } from './utils'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const currentPkgInfo = require('../package.json')

export async function upgradeValid(skipPrompts = false) {
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
      template: TemplateKeys
    }
> {
  if (args.length) {
    // help信息
    if (['-h', '--help'].includes(args[0])) {
      log(
        'help',
        `${helpMessage}
用法：${currentPkgInfo.name} [flags]
flags的值如下：
-h, --help\t打印帮助信息
-v, --version\t打印当前版本
-t, --template\t选择模板，可选值 default: 默认, front: 前端模板, node: NodeJs后端模板, full: 全栈模板`
      )
      return false
    }
    // 版本信息
    if (['-v', '--version'].includes(args[0])) {
      log('version', currentPkgInfo.version)
      await upgradeValid()
      return false
    }
    // 模板
    if (['-t', '--template'].includes(args[0])) {
      if (['default', 'front', 'node', 'full', 'modern'].includes(args[1])) {
        return {
          template: args[1] as TemplateKeys
        }
      }
      log('Template Error', '不支持的模板，使用默认模板')
      return {
        template: 'default'
      }
    }
  }
  return true
}
