export function passwordValidator(password) {
  if (password.length < 8) return false
  return true
}
