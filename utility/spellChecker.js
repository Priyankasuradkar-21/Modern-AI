const Typo = require('typo-js');
const dictionary = new Typo('en_US');

const autocorrectString = (inputString) => { 
  const words = inputString.split(/\s+/);
 
  const correctedWords = words.map(word => {
    const isMisspelled = !dictionary.check(word);
    if (isMisspelled) { 
      const suggestions = dictionary.suggest(word);
      return suggestions.length > 0 ? suggestions[0] : word;
    } else 
      return word;
  });
 
  const correctedString = correctedWords.join(' ');
  return correctedString;
}
 
module.exports = {autocorrectString}
