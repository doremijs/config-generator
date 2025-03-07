import { join } from 'node:path'
import { generateFromTemplateFile, globExisted, updatePkg } from '../../utils'
import type { ConfigGenerator } from '../interface'

const iGitGenerator: ConfigGenerator = {
  key: 'igit',
  select: {
    default: true,
    front: true,
    full: true,
    node: true
  },
  desc: 'A combined git hook tool',
  file: '.config/igit.yaml',
  refUrl: 'https://igit.erguotou.me',
  echoAfter: '请根据项目需要修改 .config/igit.yaml 文件中的配置',
  devDependencies: ['@doremijs/igit-cli'],
  checkExist(): Promise<boolean> {
    return globExisted(this.file)
  },
  execAfter: 'npx igit install',
  async generateConfig(): Promise<boolean> {
    return (
      await generateFromTemplateFile(join(__dirname, this.file as string), {
        folderPath: '.config'
      })
      &&
      (await updatePkg(this.key, ['scripts', 'postinstall'], 'igit install'))
    )
  }
}

export default iGitGenerator
