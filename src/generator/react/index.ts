import type { ConfigGenerator } from '../interface'

const ReactGenerator: ConfigGenerator = {
  key: 'react',
  select: {
    default: false,
    front: true,
    full: false,
    node: false,
    modern: true
  },
  desc: 'This is a React project',

  async checkExist(): Promise<boolean> {
    return false
  },

  async generateConfig(): Promise<boolean> {
    return true
  }
}

export default ReactGenerator
