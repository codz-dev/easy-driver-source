export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!re.test(email)) return false
  return true
}
