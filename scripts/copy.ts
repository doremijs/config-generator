import { join } from 'node:path'
import glob from 'fast-glob'
import { copyFileSync, ensureFileSync } from 'fs-extra'

export default function copyTemplates() {
  // 复制所有模板文件
  for (const temPath of glob.sync('src/generator/*/!(index.ts)')) {
    const copyTo = join(__dirname, '../', temPath.replace(/^src/, 'dist'))
    ensureFileSync(copyTo)
    copyFileSync(join(__dirname, '../', temPath), copyTo)
  }
}
