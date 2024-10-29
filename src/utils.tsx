export function truncateString(str: string, length: number) {
  if (str.length - 3 > length) {
    return str.substring(0, length) + "…";
  }
  return str;
}
