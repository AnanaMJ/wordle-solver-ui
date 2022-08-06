import { Button, HStack, SimpleGrid, VStack, Text } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { useCallback } from "react";
import { getPrioritisedListOfWords, updateListOfWords } from "./brains";
import { TextInput, Tile } from "./components";

function App() {
  const [words, setWords] = useState<string[]>([]);
  const [tiles, setTiles] = useState<string[]>([]);
  const [word, setWord] = useState<string>("");
  const prioritisedListOfWords = useMemo(() => getPrioritisedListOfWords(), []);
  const [suggestedWords, setSuggestedWord] = useState<string[]>(
    prioritisedListOfWords
  );

  const [firstTile, setFirstTile] = useState<string>("0");
  const [secondTile, setSecondTile] = useState<string>("0");
  const [thirdTile, setThirdTile] = useState<string>("0");
  const [fourthTile, setFourthTile] = useState<string>("0");
  const [fifthTile, setFifthTile] = useState<string>("0");

  const handleClick = useCallback(() => {
    setWords([...words, word]);
    const colouredAnswer =
      firstTile + secondTile + thirdTile + fourthTile + fifthTile;
    setTiles([...tiles, colouredAnswer]);
    setWord("");
    setFirstTile("0");
    setSecondTile("0");
    setThirdTile("0");
    setFourthTile("0");
    setFifthTile("0");
    const { filteredWords } = updateListOfWords(
      word,
      colouredAnswer,
      suggestedWords
    );
    setSuggestedWord(filteredWords);
  }, [
    words,
    word,
    firstTile,
    secondTile,
    thirdTile,
    fourthTile,
    fifthTile,
    suggestedWords,
    tiles,
  ]);

  const wordsToDisplay = useMemo(
    () =>
      words.map((word, index) => {
        return (
          <HStack spacing={2}>
            <Tile
              key="1"
              letter={word.charAt(0)}
              givenColor={tiles[index].charAt(0)}
              onChange={() => {}}
            />
            <Tile
              key="2"
              letter={word.charAt(1)}
              givenColor={tiles[index].charAt(1)}
              onChange={() => {}}
            />
            <Tile
              key="3"
              letter={word.charAt(2)}
              givenColor={tiles[index].charAt(2)}
              onChange={() => {}}
            />
            <Tile
              key="4"
              letter={word.charAt(3)}
              givenColor={tiles[index].charAt(3)}
              onChange={() => {}}
            />
            <Tile
              key="5"
              letter={word.charAt(4)}
              givenColor={tiles[index].charAt(4)}
              onChange={() => {}}
            />
          </HStack>
        );
      }),
    [words, tiles]
  );

  return (
    <div className="App">
      <VStack>
        <h1>The computer™️ suggests to enter the following words:</h1>
        <HStack>
          {suggestedWords.slice(0, 5).map((word) => (
            <Text key={word} fontWeight="bold">
              {word.toUpperCase()}
            </Text>
          ))}
        </HStack>
        <h2>What word did you enter?</h2>

        <HStack>
          <TextInput value={word} onChange={setWord} />
        </HStack>
        <h2>What tiles did you get?</h2>

        <HStack>
          <SimpleGrid columns={5} spacing={2}>
            <Tile key="1" givenColor={firstTile} onChange={setFirstTile} />
            <Tile key="2" givenColor={secondTile} onChange={setSecondTile} />
            <Tile key="3" givenColor={thirdTile} onChange={setThirdTile} />
            <Tile key="4" givenColor={fourthTile} onChange={setFourthTile} />
            <Tile key="5" givenColor={fifthTile} onChange={setFifthTile} />
          </SimpleGrid>
        </HStack>
        <Button onClick={handleClick}>ok</Button>
        <VStack pt={2}>{wordsToDisplay}</VStack>
      </VStack>
    </div>
  );
}

export default App;
