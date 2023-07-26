import { ConfigGenerator } from '../interface'

const ReactGenerator: ConfigGenerator = {
  key: 'react',
  select: {
    default: false,
    front: false,
    full: false,
    node: false
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
