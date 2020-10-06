const MORSE_TABLE = {
  '.-': 'a',
  '-...': 'b',
  '-.-.': 'c',
  '-..': 'd',
  '.': 'e',
  '..-.': 'f',
  '--.': 'g',
  '....': 'h',
  '..': 'i',
  '.---': 'j',
  '-.-': 'k',
  '.-..': 'l',
  '--': 'm',
  '-.': 'n',
  '---': 'o',
  '.--.': 'p',
  '--.-': 'q',
  '.-.': 'r',
  '...': 's',
  '-': 't',
  '..-': 'u',
  '...-': 'v',
  '.--': 'w',
  '-..-': 'x',
  '-.--': 'y',
  '--..': 'z',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '-----': '0',
};

function decode(expr) {
  let tempstr = ''; // stores temporary string
  let tempArr = []; // stores temporary array of strings
  let morsestr = ''; // stores temporary word decoded to morse script
  let morseArr = []; // final array of decrypted (morse) strings 
  let encoded = ''; // final encrypted string 

  // convert input string into an array of seperated by 10 chars strings
  for (let i = 0; i < expr.length; i++) {
    if (tempstr.length < 9) {
      tempstr += expr[i]; // concat first 9 chars to temp string
    } else {
      tempstr += expr[i]; // concat 10th char to temp string
      tempArr.push(tempstr); // push temp string to temp array
      tempstr = ''; // reset the temp string
    }
  }

  // convert each 10 to '.', each 11 to '-' and left each '**' as it is — (a ten-stars strings will be encrypted to a space in the next part)  
  for (let i = 0; i < tempArr.length; i++) {
    for (let k = 0; k < tempArr[i].length; k += 2) {
      tempstr = tempArr[i].substring(k, k + 2);
      if (tempstr === '10') {
        morsestr += '.';
      } else if (tempstr === '11') {
        morsestr += '-';
      } else if (tempstr === '**') {
        morsestr += '**';
      }
    }
    morseArr.push(morsestr);
    morsestr = '';
  }

  // final encoding
  for (let decoded of morseArr) {
    if (decoded in MORSE_TABLE) { // compare each element against MORSE_TABLE keys, if key exist concat it's value with final result. 
      encoded += MORSE_TABLE[decoded];
    } else if (decoded === '**********') { // If element is a ten-stars combo, then add space to a final result
      encoded += ' ';
    }
  }
  
  return encoded;
}

module.exports = {
  decode
};