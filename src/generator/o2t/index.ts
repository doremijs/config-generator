import { join } from 'node:path'
import { commonConfigExisted, generateFromTemplateFile } from '../../utils'
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
  refUrl: 'https://www.npmjs.com/package/@doremijs/o2t',
  file: '.a2s.js',
  dependencies: ['o2t.config.mjs'],

  checkExist(): Promise<boolean> {
    return commonConfigExisted(this.file)
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, this.file as string))
  }
}

export default O2TGenerator
