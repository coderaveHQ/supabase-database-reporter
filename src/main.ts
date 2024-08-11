import * as core from '@actions/core'

import { Parser, TestResult } from './parser'
import { InputProvider } from './input-providers/input-provider'
import { LocalFileProvider } from './input-providers/local-file-provider'
import { Reporter } from './reporter'

export async function run(): Promise<void> {
  try {
    const reporter: SupabaseReporter = new SupabaseReporter()
    await reporter.run()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error)
    core.setFailed(JSON.stringify(error))
  }
}

class SupabaseReporter {
  readonly fileName = core.getInput('file-name', { required: true })
  readonly failOnError =
    core.getInput('fail-on-error', { required: true }) === 'true'
  readonly failOnEmpty =
    core.getInput('fail-on-empty', { required: true }) === 'true'

  constructor() {
    if (this.fileName === '' || !this.fileName.endsWith('.txt')) {
      core.setFailed(`Input parameter 'file-name' needs to be a .txt`)
    }
  }

  async run(): Promise<void> {
    const fileContent: string = await this.readFile(this.fileName)

    const testResult: TestResult = this.parseFileContent(fileContent)

    await this.createReport(testResult)

    const conclusion: string = testResult.overallSuccess ? 'success' : 'failure'

    core.setOutput('conclusion', conclusion)
    core.setOutput('files', testResult.fileCount)
    core.setOutput('tests', testResult.testCount)
    core.setOutput('passed', testResult.successCount)
    core.setOutput('failed', testResult.failCount)

    if (!testResult.overallSuccess && this.failOnError) {
      core.setFailed(
        `Failed tests were found and 'fail-on-error' option is set to ${this.failOnError}`
      )
      return
    }

    if (testResult.testCount === 0 && this.failOnEmpty) {
      core.setFailed(
        `No tests were found and 'fail-on-empty' option is set to ${this.failOnEmpty}`
      )
      return
    }
  }

  async readFile(fileName: string): Promise<string> {
    core.info(`Reading contents of file ${fileName}`)

    const inputProvider: InputProvider = new LocalFileProvider(this.fileName)
    const fileContent: string = await inputProvider.read()
    return fileContent
  }

  parseFileContent(fileContent: string): TestResult {
    core.info('Parsing file content')

    const parser: Parser = new Parser()
    const result: TestResult = parser.parse(fileContent)
    return result
  }

  async createReport(testResult: TestResult): Promise<void> {
    core.info('Creating report')

    const reporter: Reporter = new Reporter()
    const reportContent: string = reporter.create(this.fileName, testResult)

    await core.summary.addRaw(reportContent).write()
  }
}
