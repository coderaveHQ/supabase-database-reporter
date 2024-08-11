export interface InputProvider {
  read(): Promise<string>
}
