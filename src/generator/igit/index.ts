import { join } from 'node:path'
import { generateFromTemplateFile, globExisted } from '../../utils'
import type { ConfigGenerator } from '../interface'

const iGitGenerator: ConfigGenerator = {
  key: 'igit',
  select: {
    default: true,
    front: true,
    full: true,
    node: true
  },
  desc: 'A combined git hook tool',
  file: '.config/igit.yaml',
  checkExist(): Promise<boolean> {
    return globExisted(this.file)
  },
  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, this.file as string))
  }
}

export default iGitGenerator
