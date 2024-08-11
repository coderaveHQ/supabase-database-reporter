import * as fs from 'fs'

import { InputProvider } from './input-provider'

export class LocalFileProvider implements InputProvider {
  constructor(readonly fileName: string) {}

  async read(): Promise<string> {
    const content: string = await fs.promises.readFile(this.fileName, {
      encoding: 'utf8'
    })
    return content
  }
}
