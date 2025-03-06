import { join } from 'node:path'
import { commonConfigExisted, generateFromTemplateFile } from '../../utils'
import type { ConfigGenerator } from '../interface'

const TypescriptGenerator: ConfigGenerator = {
  key: 'typescript',
  select: {
    default: true,
    front: true,
    full: true,
    node: true,
    modern: true
  },
  desc: "Javascript's superset with type safe",
  refUrl: 'https://www.typescriptlang.org/tsconfig',
  devDependencies: ['typescript'],

  checkExist(): Promise<boolean> {
    return commonConfigExisted('tsconfig.json')
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, 'tsconfig.json.tpl'))
  }
}

export default TypescriptGenerator
