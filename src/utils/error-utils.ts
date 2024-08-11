export function ensureNonNull<T>(
  value: T | null | undefined,
  errorMessage: string
): T {
  if (value === null || value === undefined) throw new Error(errorMessage)
  return value
}
