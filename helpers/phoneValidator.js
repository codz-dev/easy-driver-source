export function phoneValidator(password) {
  const regex = /^(00213|\+213|0)(5|6|7)[0-9]{8}$/;
  const isValid = regex.test(password);

  return isValid ? '' : 'Invalid';
}

