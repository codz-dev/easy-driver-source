export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!re.test(email)) return '1'
  return false
}
