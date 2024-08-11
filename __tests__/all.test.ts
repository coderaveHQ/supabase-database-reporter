import * as fs from 'fs'
import * as path from 'path'

import { FailedTest, Parser, TestFile, TestResult } from '../src/parser'
import { Reporter } from '../src/reporter'

describe('All', () => {
  const FIXTURES_FOLDER = 'fixtures'
  const OUTPUTS_FOLDER = '__outputs__'
  const EXAMPLE_DESCRIPTION = 'example description'

  const parser: Parser = new Parser()
  const reporter: Reporter = new Reporter()

  it('produces test run result with 0 file(s), 0 passed test(s), 0 failed test(s)', async () => {
    const fileName = '0-file-0-pass-0-fail.txt'

    const fixturePath: string = path.join(__dirname, FIXTURES_FOLDER, fileName)
    const fileContent: string = fs.readFileSync(fixturePath, {
      encoding: 'utf8'
    })

    const testResult: TestResult = parser.parse(fileContent)
    expect(testResult.overallSuccess).toBe(true)
    expect(testResult.fileCount).toBe(0)
    expect(testResult.testCount).toBe(0)
    expect(testResult.successCount).toBe(0)
    expect(testResult.failCount).toBe(0)
    expect(testResult.testFiles.length).toBe(0)

    const outputPath = path.join(
      __dirname,
      OUTPUTS_FOLDER,
      '0-file-0-pass-0-fail.md'
    )
    const output: string = fs.readFileSync(outputPath, { encoding: 'utf8' })

    const reportContent: string = reporter.create(fileName, testResult)
    expect(reportContent).toMatch(output)
  })

  it('produces test run result with 1 file(s), 0 passed test(s), 1 failed test(s)', async () => {
    const fileName = '1-file-0-pass-1-fail.txt'

    const fixturePath = path.join(__dirname, FIXTURES_FOLDER, fileName)
    const fileContent = fs.readFileSync(fixturePath, { encoding: 'utf8' })

    const testResult: TestResult = parser.parse(fileContent)
    expect(testResult.overallSuccess).toBe(false)
    expect(testResult.fileCount).toBe(1)
    expect(testResult.testCount).toBe(1)
    expect(testResult.successCount).toBe(0)
    expect(testResult.failCount).toBe(1)
    expect(testResult.testFiles.length).toBe(1)

    const testFile0: TestFile = testResult.testFiles[0]
    expect(testFile0.fileName).toBe('./database/example_001.test.sql')
    expect(testFile0.success).toBe(false)
    expect(testFile0.failCount).toBe(1)
    expect(testFile0.failedTests.length).toBe(1)

    const failedTest0: FailedTest = testFile0.failedTests[0]
    expect(failedTest0.index).toBe(1)
    expect(failedTest0.description).toBe(EXAMPLE_DESCRIPTION)

    const outputPath = path.join(
      __dirname,
      OUTPUTS_FOLDER,
      '1-file-0-pass-1-fail.md'
    )
    const output: string = fs.readFileSync(outputPath, { encoding: 'utf8' })

    const reportContent: string = reporter.create(fileName, testResult)
    expect(reportContent).toMatch(output)
  })

  it('produces test run result with 1 file(s), 0 passed test(s), 2 failed test(s)', async () => {
    const fileName = '1-file-0-pass-2-fail.txt'

    const fixturePath = path.join(__dirname, FIXTURES_FOLDER, fileName)
    const fileContent = fs.readFileSync(fixturePath, { encoding: 'utf8' })

    const testResult: TestResult = parser.parse(fileContent)
    expect(testResult.overallSuccess).toBe(false)
    expect(testResult.fileCount).toBe(1)
    expect(testResult.testCount).toBe(2)
    expect(testResult.successCount).toBe(0)
    expect(testResult.failCount).toBe(2)
    expect(testResult.testFiles.length).toBe(1)

    const testFile0: TestFile = testResult.testFiles[0]
    expect(testFile0.fileName).toBe('./database/example_001.test.sql')
    expect(testFile0.success).toBe(false)
    expect(testFile0.failCount).toBe(2)
    expect(testFile0.failedTests.length).toBe(2)

    const failedTest0: FailedTest = testFile0.failedTests[0]
    expect(failedTest0.index).toBe(1)
    expect(failedTest0.description).toBe(EXAMPLE_DESCRIPTION)

    const failedTest1: FailedTest = testFile0.failedTests[1]
    expect(failedTest1.index).toBe(2)
    expect(failedTest1.description).toBe(EXAMPLE_DESCRIPTION)

    const outputPath = path.join(
      __dirname,
      OUTPUTS_FOLDER,
      '1-file-0-pass-2-fail.md'
    )
    const output: string = fs.readFileSync(outputPath, { encoding: 'utf8' })

    const reportContent: string = reporter.create(fileName, testResult)
    expect(reportContent).toMatch(output)
  })

  it('produces test run result with 1 file(s), 1 passed test(s), 0 failed test(s)', async () => {
    const fileName = '1-file-1-pass-0-fail.txt'

    const fixturePath = path.join(__dirname, FIXTURES_FOLDER, fileName)
    const fileContent = fs.readFileSync(fixturePath, { encoding: 'utf8' })

    const testResult: TestResult = parser.parse(fileContent)
    expect(testResult.overallSuccess).toBe(true)
    expect(testResult.fileCount).toBe(1)
    expect(testResult.testCount).toBe(1)
    expect(testResult.successCount).toBe(1)
    expect(testResult.failCount).toBe(0)
    expect(testResult.testFiles.length).toBe(1)

    const testFile0: TestFile = testResult.testFiles[0]
    expect(testFile0.fileName).toBe('./database/example_001.test.sql')
    expect(testFile0.success).toBe(true)
    expect(testFile0.failCount).toBe(0)
    expect(testFile0.failedTests.length).toBe(0)

    const outputPath = path.join(
      __dirname,
      OUTPUTS_FOLDER,
      '1-file-1-pass-0-fail.md'
    )
    const output: string = fs.readFileSync(outputPath, { encoding: 'utf8' })

    const reportContent: string = reporter.create(fileName, testResult)
    expect(reportContent).toMatch(output)
  })

  it('produces test run result with 1 file(s), 1 passed test(s), 2 failed test(s)', async () => {
    const fileName = '1-file-1-pass-2-fail.txt'

    const fixturePath = path.join(__dirname, FIXTURES_FOLDER, fileName)
    const fileContent = fs.readFileSync(fixturePath, { encoding: 'utf8' })

    const testResult: TestResult = parser.parse(fileContent)
    expect(testResult.overallSuccess).toBe(false)
    expect(testResult.fileCount).toBe(1)
    expect(testResult.testCount).toBe(3)
    expect(testResult.successCount).toBe(1)
    expect(testResult.failCount).toBe(2)
    expect(testResult.testFiles.length).toBe(1)

    const testFile0: TestFile = testResult.testFiles[0]
    expect(testFile0.fileName).toBe('./database/example_001.test.sql')
    expect(testFile0.success).toBe(false)
    expect(testFile0.failCount).toBe(2)
    expect(testFile0.failedTests.length).toBe(2)

    const failedTest0: FailedTest = testFile0.failedTests[0]
    expect(failedTest0.index).toBe(2)
    expect(failedTest0.description).toBe(EXAMPLE_DESCRIPTION)

    const failedTest1: FailedTest = testFile0.failedTests[1]
    expect(failedTest1.index).toBe(3)
    expect(failedTest1.description).toBe(EXAMPLE_DESCRIPTION)

    const outputPath = path.join(
      __dirname,
      OUTPUTS_FOLDER,
      '1-file-1-pass-2-fail.md'
    )
    const output: string = fs.readFileSync(outputPath, { encoding: 'utf8' })

    const reportContent: string = reporter.create(fileName, testResult)
    expect(reportContent).toMatch(output)
  })

  it('produces test run result with 1 file(s), 2 passed test(s), 0 failed test(s)', async () => {
    const fileName = '1-file-2-pass-0-fail.txt'

    const fixturePath = path.join(__dirname, FIXTURES_FOLDER, fileName)
    const fileContent = fs.readFileSync(fixturePath, { encoding: 'utf8' })

    const testResult: TestResult = parser.parse(fileContent)
    expect(testResult.overallSuccess).toBe(true)
    expect(testResult.fileCount).toBe(1)
    expect(testResult.testCount).toBe(2)
    expect(testResult.successCount).toBe(2)
    expect(testResult.failCount).toBe(0)
    expect(testResult.testFiles.length).toBe(1)

    const testFile0: TestFile = testResult.testFiles[0]
    expect(testFile0.fileName).toBe('./database/example_001.test.sql')
    expect(testFile0.success).toBe(true)
    expect(testFile0.failCount).toBe(0)
    expect(testFile0.failedTests.length).toBe(0)

    const outputPath = path.join(
      __dirname,
      OUTPUTS_FOLDER,
      '1-file-2-pass-0-fail.md'
    )
    const output: string = fs.readFileSync(outputPath, { encoding: 'utf8' })

    const reportContent: string = reporter.create(fileName, testResult)
    expect(reportContent).toMatch(output)
  })

  it('produces test run result with 1 file(s), 2 passed test(s), 1 failed test(s)', async () => {
    const fileName = '1-file-2-pass-1-fail.txt'

    const fixturePath = path.join(__dirname, FIXTURES_FOLDER, fileName)
    const fileContent = fs.readFileSync(fixturePath, { encoding: 'utf8' })

    const testResult: TestResult = parser.parse(fileContent)
    expect(testResult.overallSuccess).toBe(false)
    expect(testResult.fileCount).toBe(1)
    expect(testResult.testCount).toBe(3)
    expect(testResult.successCount).toBe(2)
    expect(testResult.failCount).toBe(1)
    expect(testResult.testFiles.length).toBe(1)

    const testFile0: TestFile = testResult.testFiles[0]
    expect(testFile0.fileName).toBe('./database/example_001.test.sql')
    expect(testFile0.success).toBe(false)
    expect(testFile0.failCount).toBe(1)
    expect(testFile0.failedTests.length).toBe(1)

    const failedTest0: FailedTest = testFile0.failedTests[0]
    expect(failedTest0.index).toBe(3)
    expect(failedTest0.description).toBe(EXAMPLE_DESCRIPTION)

    const outputPath = path.join(
      __dirname,
      OUTPUTS_FOLDER,
      '1-file-2-pass-1-fail.md'
    )
    const output: string = fs.readFileSync(outputPath, { encoding: 'utf8' })

    const reportContent: string = reporter.create(fileName, testResult)
    expect(reportContent).toMatch(output)
  })

  it('produces test run result with 2 file(s), 0 passed test(s), 3 failed test(s)', async () => {
    const fileName = '2-file-0-pass-3-fail.txt'

    const fixturePath = path.join(__dirname, FIXTURES_FOLDER, fileName)
    const fileContent = fs.readFileSync(fixturePath, { encoding: 'utf8' })

    const testResult: TestResult = parser.parse(fileContent)
    expect(testResult.overallSuccess).toBe(false)
    expect(testResult.fileCount).toBe(2)
    expect(testResult.testCount).toBe(3)
    expect(testResult.successCount).toBe(0)
    expect(testResult.failCount).toBe(3)
    expect(testResult.testFiles.length).toBe(2)

    const testFile0: TestFile = testResult.testFiles[0]
    expect(testFile0.fileName).toBe('./database/example_001.test.sql')
    expect(testFile0.success).toBe(false)
    expect(testFile0.failCount).toBe(1)
    expect(testFile0.failedTests.length).toBe(1)

    const testFile1: TestFile = testResult.testFiles[1]
    expect(testFile1.fileName).toBe('./database/example_002.test.sql')
    expect(testFile1.success).toBe(false)
    expect(testFile1.failCount).toBe(2)
    expect(testFile1.failedTests.length).toBe(2)

    const failedTest0: FailedTest = testFile0.failedTests[0]
    expect(failedTest0.index).toBe(1)
    expect(failedTest0.description).toBe(EXAMPLE_DESCRIPTION)

    const failedTest1: FailedTest = testFile1.failedTests[0]
    expect(failedTest1.index).toBe(1)
    expect(failedTest1.description).toBe(EXAMPLE_DESCRIPTION)

    const failedTest2: FailedTest = testFile1.failedTests[1]
    expect(failedTest2.index).toBe(2)
    expect(failedTest2.description).toBe(EXAMPLE_DESCRIPTION)

    const outputPath = path.join(
      __dirname,
      OUTPUTS_FOLDER,
      '2-file-0-pass-3-fail.md'
    )
    const output: string = fs.readFileSync(outputPath, { encoding: 'utf8' })

    const reportContent: string = reporter.create(fileName, testResult)
    expect(reportContent).toMatch(output)
  })

  it('produces test run result with 2 file(s), 3 passed test(s), 0 failed test(s)', async () => {
    const fileName = '2-file-3-pass-0-fail.txt'

    const fixturePath = path.join(__dirname, FIXTURES_FOLDER, fileName)
    const fileContent = fs.readFileSync(fixturePath, { encoding: 'utf8' })

    const testResult: TestResult = parser.parse(fileContent)
    expect(testResult.overallSuccess).toBe(true)
    expect(testResult.fileCount).toBe(2)
    expect(testResult.testCount).toBe(3)
    expect(testResult.successCount).toBe(3)
    expect(testResult.failCount).toBe(0)
    expect(testResult.testFiles.length).toBe(2)

    const testFile0: TestFile = testResult.testFiles[0]
    expect(testFile0.fileName).toBe('./database/example_001.test.sql')
    expect(testFile0.success).toBe(true)
    expect(testFile0.failCount).toBe(0)
    expect(testFile0.failedTests.length).toBe(0)

    const testFile1: TestFile = testResult.testFiles[1]
    expect(testFile1.fileName).toBe('./database/example_002.test.sql')
    expect(testFile1.success).toBe(true)
    expect(testFile1.failCount).toBe(0)
    expect(testFile1.failedTests.length).toBe(0)

    const outputPath = path.join(
      __dirname,
      OUTPUTS_FOLDER,
      '2-file-3-pass-0-fail.md'
    )
    const output: string = fs.readFileSync(outputPath, { encoding: 'utf8' })

    const reportContent: string = reporter.create(fileName, testResult)
    expect(reportContent).toMatch(output)
  })

  it('produces test run result with 3 file(s), 2 passed test(s), 2 failed test(s)', async () => {
    const fileName = '3-file-2-pass-2-fail.txt'

    const fixturePath = path.join(__dirname, FIXTURES_FOLDER, fileName)
    const fileContent = fs.readFileSync(fixturePath, { encoding: 'utf8' })

    const testResult: TestResult = parser.parse(fileContent)
    expect(testResult.overallSuccess).toBe(false)
    expect(testResult.fileCount).toBe(3)
    expect(testResult.testCount).toBe(4)
    expect(testResult.successCount).toBe(2)
    expect(testResult.failCount).toBe(2)
    expect(testResult.testFiles.length).toBe(3)

    const testFile0: TestFile = testResult.testFiles[0]
    expect(testFile0.fileName).toBe('./database/example_001.test.sql')
    expect(testFile0.success).toBe(true)
    expect(testFile0.failCount).toBe(0)
    expect(testFile0.failedTests.length).toBe(0)

    const testFile1: TestFile = testResult.testFiles[1]
    expect(testFile1.fileName).toBe('./database/example_002.test.sql')
    expect(testFile1.success).toBe(false)
    expect(testFile1.failCount).toBe(1)
    expect(testFile1.failedTests.length).toBe(1)

    const testFile2: TestFile = testResult.testFiles[2]
    expect(testFile2.fileName).toBe('./database/example_003.test.sql')
    expect(testFile2.success).toBe(false)
    expect(testFile2.failCount).toBe(1)
    expect(testFile2.failedTests.length).toBe(1)

    const failedTest0: FailedTest = testFile1.failedTests[0]
    expect(failedTest0.index).toBe(2)
    expect(failedTest0.description).toBe(EXAMPLE_DESCRIPTION)

    const failedTest1: FailedTest = testFile2.failedTests[0]
    expect(failedTest1.index).toBe(1)
    expect(failedTest1.description).toBe(EXAMPLE_DESCRIPTION)

    const outputPath = path.join(
      __dirname,
      OUTPUTS_FOLDER,
      '3-file-2-pass-2-fail.md'
    )
    const output: string = fs.readFileSync(outputPath, { encoding: 'utf8' })

    const reportContent: string = reporter.create(fileName, testResult)
    expect(reportContent).toMatch(output)
  })
})
