import { join } from 'node:path'
import { generateFromTemplateFile, globExisted } from '../../utils'
import type { ConfigGenerator } from '../interface'

const EditorconfigGenerator: ConfigGenerator = {
  key: 'editorconfig',
  select: {
    default: true,
    front: true,
    full: true,
    node: true
  },
  desc: 'Helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs',
  refUrl: 'https://editorconfig.org/',
  file: '.editorconfig',
  checkExist(): Promise<boolean> {
    return globExisted(this.file)
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, this.file as string))
  }
}

export default EditorconfigGenerator
