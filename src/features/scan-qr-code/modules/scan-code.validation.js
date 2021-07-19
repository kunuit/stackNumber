export const codeValidator = code => {
  if (!code || code.length <= 0) return 'Code cannot be empty';
  if (code.length != 7) return 'Code must 7 words';

  return '';
};
