import { configInPackageJSON } from '../../utils'
import type { ConfigGenerator } from '../interface'

const VoltaGenerator: ConfigGenerator = {
  key: 'volta',
  desc: 'The Hassle-Free JavaScript Tool Manager',
  refUrl: 'https://volta.sh/',
  select: {
    modern: true
  },
  execAfter: 'volta pin node',

  async checkExist(): Promise<boolean> {
    return configInPackageJSON(['volta'])
  },

  async generateConfig(): Promise<boolean> {
    return true
  }
}

export default VoltaGenerator
