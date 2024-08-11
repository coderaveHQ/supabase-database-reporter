import { ensureNonNull } from './utils/error-utils'

export class TestResult {
  overallSuccess: boolean
  fileCount: number
  testCount: number
  failCount: number
  successCount: number
  testFiles: TestFile[]

  constructor(
    overallSuccess: boolean,
    fileCount: number,
    testCount: number,
    failCount: number,
    successCount: number,
    testFiles: TestFile[]
  ) {
    this.overallSuccess = overallSuccess
    this.fileCount = fileCount
    this.testCount = testCount
    this.failCount = failCount
    this.successCount = successCount
    this.testFiles = testFiles
  }
}

export class TestFile {
  success: boolean
  fileName: string
  failCount: number
  failedTests: FailedTest[]

  constructor(
    success: boolean,
    fileName: string,
    failCount: number,
    failedTests: FailedTest[] = []
  ) {
    this.success = success
    this.fileName = fileName
    this.failCount = failCount
    this.failedTests = failedTests
  }
}

export class FailedTest {
  index: number
  description: string

  constructor(index: number, description: string) {
    this.index = index
    this.description = description
  }
}

export class Parser {
  parse(content: string): TestResult {
    return this.getTestResult(content)
  }

  private getTestResult(content: string): TestResult {
    const lines: string[] = content.split('\n')

    let overallSuccess = true
    let fileCount = 0
    let testCount = 0
    let failCount = 0
    const testFiles: TestFile[] = []

    let testFileName = ''
    let fileFailCount = 0
    let failedTests: FailedTest[] = []

    for (const line of lines) {
      if (line.startsWith('./')) {
        testFileName = ''
        fileFailCount = 0
        failedTests = []

        const lineParts: string[] = line.split(' ')
        testFileName = lineParts[0]
        const passed: boolean = lineParts[lineParts.length - 1] === 'ok'

        if (passed) testFiles.push(new TestFile(true, testFileName, 0, []))
      } else if (line.startsWith('# Failed')) {
        const numberMatch = line.match(/test (\d+):/)

        const testIndex: number = parseInt(
          ensureNonNull(numberMatch, 'Failed to find test index')[1],
          10
        )

        const descriptionMatch = line.match(/"([^"]+)"/)
        const testDescription: string = ensureNonNull(
          descriptionMatch,
          'Failed to find test description'
        )[1]

        failCount++
        fileFailCount++

        failedTests.push(new FailedTest(testIndex, testDescription))
      } else if (line.startsWith('# Looks')) {
        testFiles.push(
          new TestFile(false, testFileName, fileFailCount, failedTests)
        )
      } else if (line.startsWith('Files')) {
        const filesMatch = line.match(/Files=(\d+)/)
        fileCount = parseInt(
          ensureNonNull(filesMatch, 'Failed to find file count')[1],
          10
        )

        const testsMatch = line.match(/Tests=(\d+)/)
        testCount = parseInt(
          ensureNonNull(testsMatch, 'Failed to find test count')[1],
          10
        )
      } else if (line.startsWith('Result')) {
        overallSuccess = !line.includes('FAIL')
      }
    }

    const successCount: number = testCount - failCount

    return new TestResult(
      overallSuccess,
      fileCount,
      testCount,
      failCount,
      successCount,
      testFiles
    )
  }
}
