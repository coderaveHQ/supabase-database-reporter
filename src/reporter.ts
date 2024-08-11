import { TestResult, TestFile } from './parser'
import { Align, Icon, table } from './utils/markdown-utils'

export class Reporter {
  create(fileName: string, result: TestResult): string {
    return this.getReport(fileName, result)
  }

  private getReport(fileName: string, testResult: TestResult): string {
    const sections: string[] = []

    const badge: string = this.getBadge(testResult.failCount)
    sections.push(badge)

    const icon: string = this.getResultIcon(testResult.overallSuccess)
    sections.push(`## ${icon}\xa0${fileName}`)

    const overviewLine = this.getOverviewLine(
      testResult.testCount,
      testResult.fileCount,
      testResult.successCount,
      testResult.failCount
    )
    sections.push(overviewLine)

    if (testResult.fileCount !== 0) {
      const filesTable = this.getFilesTable(testResult.testFiles)
      sections.push(filesTable)

      const failingTests = testResult.testFiles
        .filter(testFile => !testFile.success)
        .map(testFile => this.getFailingTest(testFile))
        .flat()
      sections.push(...failingTests)
    }

    return sections.join('\n')
  }

  private getBadge(failCount: number): string {
    const message: string = failCount > 0 ? `${failCount} failed` : 'All passed'
    const color: string = failCount > 0 ? 'critical' : 'success'
    const hint: string =
      failCount > 0 ? 'Tests failed' : 'Tests passed successfully'
    const uri: string = encodeURIComponent(`tests-${message}-${color}`)
    return `![${hint}](https://img.shields.io/badge/${uri})`
  }

  private getOverviewLine(
    testCount: number,
    fileCount: number,
    successCount: number,
    failCount: number
  ): string {
    return `**${testCount}** tests were completed in **${fileCount}** files with **${successCount}** passed and **${failCount}** failed.`
  }

  private getFilesTable(testFiles: TestFile[]): string {
    return table(
      ['Test suite', 'Passed', 'Failed'],
      [Align.Left, Align.Right, Align.Right],
      ...testFiles.map(testFile => {
        const passed = testFile.success ? Icon.success : ''
        const failed = !testFile.success
          ? `${testFile.failCount} ${Icon.fail}`
          : ''
        return [testFile.fileName, passed, failed]
      })
    )
  }

  private getFailingTest(failingFile: TestFile): string[] {
    const sections: string[] = []

    sections.push(`### ${this.getResultIcon(false)}\xa0${failingFile.fileName}`)

    sections.push('```')

    for (const failingTest of failingFile.failedTests) {
      sections.push(`Test ${failingTest.index}: ${failingTest.description}`)
    }

    sections.push('```')

    return sections
  }

  private getResultIcon(success: boolean): string {
    return success ? Icon.success : Icon.fail
  }
}
