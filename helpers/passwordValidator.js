export function passwordValidator(password) {
  if (password.length < 8) return 'Password must be at least 5 characters long.'
  return ''
}
