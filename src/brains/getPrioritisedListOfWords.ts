import wordleAllowedGuesses from "../wordle-files/wordle-allowed-guesses.js";
import wordleAnswersAlphabetical from "../wordle-files/wordle-answers-alphabetical.js";

export const getPrioritisedListOfWords: () => string[] = () => {
  // get all words
  const allowedGuesses = wordleAllowedGuesses.split("\n");
  const answers = wordleAnswersAlphabetical.split("\n");
  const possibleGuesses = [...allowedGuesses, ...answers].sort();

  console.log("allowedGuesses", allowedGuesses);
  console.log("answers", answers);
  console.log("possibleGuesses", possibleGuesses);

  // get a ranking of letters
  // const letters = [...Array(26)].map((_, i) =>
  //   String.fromCharCode(65 + i).toLowerCase()
  // );

  const lettersOccurence: Map<string, number> = new Map();
  possibleGuesses.forEach((word) => {
    for (var i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      if (!lettersOccurence.get(char)) {
        lettersOccurence.set(char, 1);
      } else {
        lettersOccurence.set(char, lettersOccurence.get(char)! + 1);
      }
    }
  });
  console.log("possibleGuesses", possibleGuesses);

  // find best word for the first try
  const wordToValue: Map<string, number> = new Map();
  possibleGuesses.forEach((word) => {
    let total = 0;
    for (var i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      // make the word less valuable if we've already seen those letters
      const value =
        word.indexOf(char) === word.lastIndexOf(char)
          ? lettersOccurence.get(char)!
          : lettersOccurence.get(char)! / 2;
      total = total + value;
    }
    wordToValue.set(word, total);
  });
  console.log("wordToValue", wordToValue);
  console.log("wordToValue.keys()", wordToValue.keys());

  const response = [...wordToValue.entries()]
    .sort((a, b) => b[1] - a[1])
    .map((item) => item[0]);

  console.log("wordToValue", wordToValue);
  console.log("response", response);
  return response;
};
