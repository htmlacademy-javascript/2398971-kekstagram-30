let getStringLength = (string, maxLength) => string.length <= maxLength;

let checkPolydrome = (string) => {
  let stringNormalize = string.replaceAll(' ', '').toLowerCase();
  let stringReverse = '';
  for (let i = stringNormalize.length - 1; i > -1; i--) {
    stringReverse += stringNormalize.at(i)};
  return stringNormalize === stringReverse;
};

let getNumbersString = (string) => {
  let number = '';
  string += '';
  for (let i = 0; i <= string.length - 1; i++) {
    if (Number.isNaN(parseInt(string.at(i))) === false) {number += string.at(i).toString()}
  }
  if (Number(number)=== 0) {return Number.NaN} else {return Number(number)};
};
