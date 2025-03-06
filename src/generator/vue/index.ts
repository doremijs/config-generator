import type { ConfigGenerator } from '../interface'

const VueGenerator: ConfigGenerator = {
  key: 'vue',
  select: {
    default: false,
    front: false,
    full: false,
    node: false,
    modern: false
  },
  desc: 'This is a Vue project',

  async checkExist(): Promise<boolean> {
    return false
  },

  async generateConfig(): Promise<boolean> {
    return true
  }
}

export default VueGenerator
