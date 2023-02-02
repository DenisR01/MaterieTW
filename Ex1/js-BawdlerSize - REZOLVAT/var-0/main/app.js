function bowdlerize(input, dictionary) {
  if (typeof input !== 'string')
    throw new Error(`Input should be a string`);

  if (dictionary.filter(elem => typeof elem !== 'string').length !== 0) 
    throw new Error(`Invalid dictionary format`);

  const words = input.split(' ');

  dictionary = dictionary.map(dictWord => dictWord.toLowerCase());


  let censoredInput = input;

  words.map(word => {
    if (dictionary.includes(word.toLowerCase())) {
      const newWord = word[0] + "*".repeat(word.length - 2) + word[word.length - 1];
      censoredInput = censoredInput.replace(word, newWord); 
    }
  })

  return censoredInput;
}

const app = {
  bowdlerize
};

module.exports = app;


