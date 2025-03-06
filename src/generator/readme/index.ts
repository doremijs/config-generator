import { join } from 'node:path'
import { generateFromTemplateFile, getPkgInfo, globExisted } from '../../utils'
import type { ConfigGenerator } from '../interface'

const ReadmeGenerator: ConfigGenerator = {
  key: 'readme',
  select: {
    default: true,
    front: true,
    full: true,
    node: true,
    modern: true
  },
  desc: 'Tell others about your project',
  echoAfter: '你可能需要更改 README 文件中的内容。',

  checkExist(): Promise<boolean> {
    return globExisted('README?(.md)')
  },

  async generateConfig(): Promise<boolean> {
    const pkg = getPkgInfo()
    return generateFromTemplateFile(join(__dirname, 'README.md'), {
      interpolationValues: {
        name: (pkg?.name as string) ?? '<product name>'
      }
    })
  }
}

export default ReadmeGenerator
