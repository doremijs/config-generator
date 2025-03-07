import { join } from 'node:path'
import { commonConfigExisted, generateFromTemplateFile, updatePkg } from '../../utils'
import type { ConfigGenerator } from '../interface'

const O2TGenerator: ConfigGenerator = {
  key: 'o2t',
  select: {
    default: false,
    front: true,
    full: false,
    node: false
  },
  desc: 'OpenAPI client code generator',
  refUrl: 'https://github.com/doremijs/openapi-generator',
  file: 'o2t.config.mjs',
  dependencies: ['@doremijs/o2t'],
  echoAfter: '请修改 o2t.config.mjs 文件中的 specUrl 和其它配置',

  checkExist(): Promise<boolean> {
    return commonConfigExisted(this.file)
  },

  async generateConfig(): Promise<boolean> {
    return (
      (await generateFromTemplateFile(join(__dirname, this.file as string))) &&
      (await updatePkg(this.key, ['scripts', 'gen:sdk'], 'o2t generate typescript'))
    )
  }
}

export default O2TGenerator
