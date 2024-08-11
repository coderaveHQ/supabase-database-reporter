/* eslint-disable no-shadow */
export enum Align {
  Left = ':---',
  Center = ':---:',
  Right = '---:',
  None = '---'
}
/* eslint-enable no-shadow */

export const Icon = {
  success: '✅',
  fail: '❌'
}

type ToString = string | number | boolean | Date
export function table(
  headers: ToString[],
  alignments: Align[],
  ...rows: ToString[][]
): string {
  const headerRow = `|${headers.map(tableEscape).join('|')}|`
  const alignRow = `|${alignments.join('|')}|`
  const contentRows = rows
    .map(row => `|${row.map(tableEscape).join('|')}|`)
    .join('\n')
  return [headerRow, alignRow, contentRows].join('\n')
}

function tableEscape(content: ToString): string {
  return content.toString().replace('|', '\\|')
}
