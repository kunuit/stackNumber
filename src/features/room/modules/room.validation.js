export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';
  if (name.length <= 3) return 'Name must more 3 words';
  if (name.length > 20) return 'Name must less 21 words';
  return '';
};
