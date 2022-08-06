// 0 = black
// 1 = yellow
// 2 = green

export const updateListOfWords = (
  answer: string,
  colouredAnswer: string,
  filteredWords: string[]
) => {
  for (var i = 0; i < 5; i++) {
    const letterAtCurrentIndex = answer.charAt(i);

    let noBlacks: string[] = [];
    let noYellows: string[] = [];
    let keepGreens: string[] = [];
    const colour = colouredAnswer.charAt(i);
    if (colour === "0") {
      noBlacks = filteredWords.filter(
        (filteredWord) => !filteredWord.includes(letterAtCurrentIndex)
      );
    }
    if (colour === "1") {
      noYellows = (noBlacks.length ? noBlacks : filteredWords).filter(
        (filteredWord) =>
          filteredWord.charAt(i) !== letterAtCurrentIndex &&
          filteredWord.includes(letterAtCurrentIndex)
      );
    }
    if (colour === "2") {
      keepGreens = (
        noYellows.length
          ? noYellows
          : noBlacks.length
          ? noBlacks
          : filteredWords
      ).filter((word) => word.charAt(i) === letterAtCurrentIndex);
    }
    filteredWords = keepGreens.length
      ? keepGreens
      : noYellows.length
      ? noYellows
      : noBlacks;
  }
  console.log("filteredWords", filteredWords);
  return filteredWords;
};
