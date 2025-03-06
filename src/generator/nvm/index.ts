import { join } from 'node:path'
import { generateFromTemplateFile, globExisted } from '../../utils'
import type { ConfigGenerator } from '../interface'

const NvmGenerator: ConfigGenerator = {
  key: 'nvm',
  desc: 'A version manager for node.js',
  refUrl: 'https://github.com/nvm-sh/nvm#nvmrc',
  file: '.nvmrc',
  checkExist(): Promise<boolean> {
    return globExisted(this.file)
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, this.file as string))
  }
}

export default NvmGenerator
