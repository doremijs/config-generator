export function isVersionUpdated(a: string, b: string): boolean {
  const aArr = a.split('.')
  const bArr = b.split('.')
  for (let i = 0; i < aArr.length; i++) {
    const aNum = Number.parseInt(aArr[i])
    const bNum = Number.parseInt(bArr[i])
    if (aNum > bNum) {
      return false
    }
    if (aNum < bNum) {
      return true
    }
  }
  return false
}
