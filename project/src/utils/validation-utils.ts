export const hasDigit = (word: string) => word.match(/\d/);

export const hasLetter = (word: string) => word.match(/[a-zA-Z]/);

export const isPassword = (word: string) => hasDigit(word) && hasLetter(word);

export const isEmail = (word:string) => {
  const emailRegEx = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
  return word.match(emailRegEx);
};
