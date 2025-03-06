import { updatePkg } from '../../utils'
import type { ConfigGenerator } from '../interface'

const OxlintGenerator: ConfigGenerator = {
  key: 'oxlint',
  select: {
    default: true,
    front: true,
    full: true,
    node: true,
    modern: true
  },
  desc: 'A collection of JavaScript tools written in Rust',
  refUrl: [
    {
      label: 'Reference',
      url: 'https://oxc-project.github.io/'
    }
  ],
  dependencies: ['oxlint'],
  async checkExist(): Promise<boolean> {
    return Promise.resolve(false)
  },
  async generateConfig(): Promise<boolean> {
    return await updatePkg(this.key, ['scripts', 'oxlint'], 'oxlint .')
  }
}

export default OxlintGenerator
