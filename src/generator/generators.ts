// import A2SGenerator from './a2s'
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
import iGitGenerator from './igit'
import JestGenerator from './jest'
import LicenseGenerator from './license'
import LintStagedGenerator from './lintstage'
import NpmGenerator from './npm'
import NvmGenerator from './nvm'
import O2TGenerator from './o2t'
import OxlintGenerator from './oxlint'
import PrettierGenerator from './prettier'
import ReactGenerator from './react'
import ReadmeGenerator from './readme'
import StylelintGenerator from './stylelint'
import TypescriptGenerator from './typescript'
import VueGenerator from './vue'

export const availableConfigs = {
  // a2s: A2SGenerator,
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
  igit: iGitGenerator,
  jest: JestGenerator,
  license: LicenseGenerator,
  lintstaged: LintStagedGenerator,
  npm: NpmGenerator,
  nvm: NvmGenerator,
  o2t: O2TGenerator,
  oxlint: OxlintGenerator,
  prettier: PrettierGenerator,
  react: ReactGenerator,
  vue: VueGenerator,
  readme: ReadmeGenerator,
  stylelint: StylelintGenerator,
  typescript: TypescriptGenerator
} as const

export type AvailableConfigs = typeof availableConfigs

export type AvailableConfigKeys = keyof AvailableConfigs
