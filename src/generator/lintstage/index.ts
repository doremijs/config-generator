import { join } from 'path'
import {
  generateFromTemplateFile,
  commonConfigExisted,
  configInPackageJSON
} from '../../utils'
import { AvailableConfigKeys } from '../generators'
import { ConfigGenerator } from '../interface'

const LintStagedGenerator: ConfigGenerator = {
  key: 'lintstaged',
  select: {
    default: true,
    front: true,
    full: true,
    node: true,
    modern: true
  },
  desc:
    "Run linters against staged git files and don't let 💩 slip into your code base!",
  refUrl: 'https://www.npmjs.com/package/lint-staged',
  devDependencies: ['lint-staged'],

  async checkExist(): Promise<boolean> {
    return (
      (await commonConfigExisted(this.key)) ||
      configInPackageJSON(['lint-staged'])
    )
  },

  async generateConfig(
    selectedConfigKeys: AvailableConfigKeys[]
  ): Promise<boolean> {
    return (
      (await generateFromTemplateFile(
        join(__dirname, '.lintstagedrc.cjs.tpl'),
        {
          interpolationValues: {
            prettier: selectedConfigKeys.includes('prettier'),
            eslint: selectedConfigKeys.includes('eslint'),
            oxlint: selectedConfigKeys.includes('oxlint'),
            biome: selectedConfigKeys.includes('biome')
          }
        }
      )) &&
      (await generateFromTemplateFile(join(__dirname, 'pre-commit'), {
        folderPath: '.husky'
      }))
    )
  }
}

export default LintStagedGenerator
