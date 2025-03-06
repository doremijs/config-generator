import { join } from 'node:path'
import { configInPackageJSON, generateFromTemplateFile, getPkgInfo, globExisted, updatePkg } from '../../utils'
import type { ConfigGenerator } from '../interface'

const LicenseGenerator: ConfigGenerator = {
  key: 'license',
  select: {
    default: true,
    front: true,
    full: true,
    node: true
  },
  desc: "Project's license instruction",
  refUrl: 'https://opensource.org/licenses',
  echoAfter: '你可能需要更改 LICENSE 和 package.json 文件中协议的说明，默认使用 GPL-3.0-or-later 协议。',

  async checkExist(): Promise<boolean> {
    return (await globExisted('LICENSE')) || configInPackageJSON(['license'])
  },

  async generateConfig(): Promise<boolean> {
    const pkg = getPkgInfo()
    return (
      (await generateFromTemplateFile(join(__dirname, 'LICENSE.tpl'), {
        interpolationValues: {
          name: (pkg?.name as string) ?? '<product name>',
          author: (pkg?.author as string) ?? '<author>',
          year: new Date().getFullYear()
        }
      })) && (await updatePkg(this.key, ['license'], 'GPL-3.0-or-later'))
    )
  }
}

export default LicenseGenerator
