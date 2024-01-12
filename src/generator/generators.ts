// import BabelGenerator from './babel'
import BiomeGenerator from './biome'
import BrowserslistGenerator from './browserslist'
import CommitlintGenerator from './commitlint'
import DevmojiGenerator from './devmoji'
import DockerGenerator from './docker'
import EditorconfigGenerator from './editorconfig'
import EslintGenerator from './eslint'
import GitGenerator from './git'
import HuskyGenerator from './husky'
import JestGenerator from './jest'
import LicenseGenerator from './license'
import LintStagedGenerator from './lintstage'
import NpmGenerator from './npm'
import NvmGenerator from './nvm'
import OxlintGenerator from './oxlint'
import PrettierGenerator from './prettier'
import ReadmeGenerator from './readme'
import StylelintGenerator from './stylelint'
import TypescriptGenerator from './typescript'
// import A2SGenerator from './a2s'
import ReactGenerator from './react'
import VueGenerator from './vue'

export const availableConfigs = {
  // babel: BabelGenerator,
  biome: BiomeGenerator,
  browserslist: BrowserslistGenerator,
  commitlint: CommitlintGenerator,
  devmoji: DevmojiGenerator,
  docker: DockerGenerator,
  editorconfig: EditorconfigGenerator,
  eslint: EslintGenerator,
  git: GitGenerator,
  husky: HuskyGenerator,
  jest: JestGenerator,
  license: LicenseGenerator,
  lintstaged: LintStagedGenerator,
  npm: NpmGenerator,
  nvm: NvmGenerator,
  oxlint: OxlintGenerator,
  prettier: PrettierGenerator,
  react: ReactGenerator,
  vue: VueGenerator,
  readme: ReadmeGenerator,
  stylelint: StylelintGenerator,
  typescript: TypescriptGenerator
  // a2s: A2SGenerator
} as const

export type AvailableConfigs = typeof availableConfigs

export type AvailableConfigKeys = keyof AvailableConfigs
