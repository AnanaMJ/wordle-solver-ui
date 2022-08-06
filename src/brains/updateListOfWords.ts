// 0 = black
// 1 = yellow
// 2 = green

export const updateListOfWords = (
  answer: string,
  colouredAnswer: string,
  filteredWords: string[]
) => {
  for (var index = 0; index < 5; index++) {
    const letterAtCurrentIndex = answer.charAt(index);

    let noBlacks: string[] = [];
    let noYellows: string[] = [];
    let keepGreens: string[] = [];
    const colour = colouredAnswer.charAt(index);
    // keep all greens
    if (colour === "2") {
      keepGreens = filteredWords.filter(
        // eslint-disable-next-line no-loop-func
        (word) => word.charAt(index) === letterAtCurrentIndex
      );
    }

    // keep yellow letters but not at the current position
    if (colour === "1") {
      noYellows = (keepGreens.length ? keepGreens : filteredWords).filter(
        // eslint-disable-next-line no-loop-func
        (filteredWord) =>
          filteredWord.charAt(index) !== letterAtCurrentIndex &&
          filteredWord.includes(letterAtCurrentIndex)
      );
    }

    // deal with black letters
    if (colour === "0") {
      noBlacks = (
        noYellows.length
          ? noYellows
          : keepGreens.length
          ? keepGreens
          : filteredWords
      ).filter(
        // eslint-disable-next-line no-loop-func
        (filteredWord) => {
          const indices = [...answer].flatMap((char, i) =>
            char === letterAtCurrentIndex ? i + 1 : []
          );
          if (indices.length === 1) {
            // if this is the only letter and it's black, filter it out
            return !filteredWord.includes(letterAtCurrentIndex);
          } else {
            let greenCount = 0;
            let yellowCount = 0;
            indices.forEach((i) => {
              if (colouredAnswer.charAt(i - 1) === "2") greenCount += 1;
              if (colouredAnswer.charAt(i - 1) === "1") yellowCount += 1;
            });
            const numberOfLettersAllowed = greenCount + yellowCount;
            // letter can't be at the black positions and can't have more occurence than yellow + green
            return (
              filteredWord.charAt(index) !== letterAtCurrentIndex &&
              [...filteredWord].flatMap((char, i) =>
                char === letterAtCurrentIndex ? i + 1 : []
              ).length === numberOfLettersAllowed
            );
          }
        }
      );
    }
    filteredWords = keepGreens.length
      ? keepGreens
      : noYellows.length
      ? noYellows
      : noBlacks;
  }
  return { filteredWords };
};
