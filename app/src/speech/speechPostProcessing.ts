const postProcessText = (text: string) => {
  console.log('Original Text: ' + text);
  text = replaceWords(text);
  text = replacePunctuation(text);
  text = fixSpacing(text);
  text = fixCapitalization(text);
  text = fixPunctuation(text);
  console.log('Fixed Text: ' + text);
  return text;
};

const replaceWords = (text: string) => {
  return text.replace(/a sign/g, 'assign').replace(/labours/g, 'labels');
};

const replacePunctuation = (text: string) => {
  return text.replace(/period/g, '.').replace(/Period/g, '.');
};

const fixSpacing = (text: string) => {
  return text
    .replace(/ +(?= )/g, '') // remove multiple spaces
    .replace(/ ([,|.|!|?|;]) ?/g, '$1'.trim() + ' ') // fix spacing next to punctuation
    .replace(/(\d*)( *, *)(\d)/g, '$1' + ',' + '$3') // fix spacing between numbers
    .trim(); // remove leading and training spaces
};

const fixCapitalization = (text: string) => {
  text = text.charAt(0).toUpperCase() + text.slice(1);
  text = text.replace(/([.|!|?]) ([a-z])/g, ($0, $1, $2) => {
    // unused parameter is needed
    return $0.replace($2, $2.toUpperCase()); // a simple "$2".toUpperCase()does not work
  }); // capitalize after punctuation mark
  return text;
};

const fixPunctuation = (text: string) => {
  // add punctuation to end if missing
  if (
    text !== '' &&
    text.split(' ').length > 5 &&
    !/([.|!|?])$/g.test(text.slice(-1))
  ) {
    text = text + '.';
  }
  return text;
};

export { fixSpacing, fixCapitalization, fixPunctuation, replaceWords };

export default postProcessText;
