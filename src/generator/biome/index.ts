import { join } from 'path'
import { fileExisted, generateFromTemplateFile, updatePkg } from '../../utils'
import { ConfigGenerator } from '../interface'

const BiomeGenerator: ConfigGenerator = {
  key: 'biome',
  select: {
    default: true,
    front: true,
    full: true,
    node: true,
    modern: true
  },
  desc: 'Format, lint, and more in a fraction of a second, write in Rust',
  refUrl: 'https://biomejs.dev/',
  devDependencies: ['@biomejs/biome'],
  async checkExist(): Promise<boolean> {
    return await fileExisted('biome.json')
  },

  async generateConfig(): Promise<boolean> {
    return (
      (await generateFromTemplateFile(join(__dirname, 'biome.json'))) &&
      (await updatePkg(
        this.key,
        ['scripts', 'format'],
        'biome check --write .'
      ))
    )
  }
}

export default BiomeGenerator
