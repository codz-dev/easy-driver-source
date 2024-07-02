export function usernameValidator(name) {
  // must be between 4 and 20 characters, only letters and numbers and _ are allowed
  if (!/^[a-zA-Z0-9_]{4,20}$/.test(name)) return 'Username must be between 4 and 20 characters, only letters and numbers and _ are allowed.'
  
  return ''
}
