export function codeValidator(password) {
   // must be only numbers and have 6 digits
    const re = /^[0-9\b]+$/;
    if (!re.test(password)) {
      return false
    }
    return true
  }
  
