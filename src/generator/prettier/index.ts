import { join } from 'node:path'
import { commonConfigExisted, configInPackageJSON, generateFromTemplateFile, globExisted, updatePkg } from '../../utils'
import type { ConfigGenerator } from '../interface'

const PrettierGenerator: ConfigGenerator = {
  key: 'prettier',
  select: {
    default: false,
    front: false,
    full: false,
    node: false,
    modern: false
  },
  desc: 'An opinionated code formatter',
  refUrl: 'https://prettier.io/docs/en/configuration.html',
  devDependencies: ['prettier', '@doremijs/prettier-config'],
  async checkExist(): Promise<boolean> {
    return (
      (await commonConfigExisted('prettier')) ||
      (await globExisted('.prettierrc.json5')) ||
      (await globExisted('.prettierrc.toml')) ||
      configInPackageJSON(['prettier'])
    )
  },

  async generateConfig(): Promise<boolean> {
    return (
      (await updatePkg(this.key, ['prettier'], '@doremijs/prettier-config')) &&
      (await updatePkg(
        this.key,
        ['scripts', 'prettier'],
        'prettier "*.!(js|jsx|ts|tsx|css|less|styl|scss|sass)" --write'
      )) &&
      (await generateFromTemplateFile(join(__dirname, '.prettierignore')))
    )
  }
}

export default PrettierGenerator
