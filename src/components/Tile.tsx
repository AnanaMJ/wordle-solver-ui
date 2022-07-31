import React, { Dispatch, FC, SetStateAction } from "react";
import { Box, Text } from "@chakra-ui/react";

// 0 = black
// 1 = yellow
// 2 = green

type TileProps = {
  letter?: string;
  givenColor: string;
  onChange: Dispatch<SetStateAction<string>>;
};

const getColor = (value: string) =>
  value === "0" ? "blackAlpha.800" : value === "1" ? "yellow.500" : "green.500";

export const Tile: FC<TileProps> = ({ letter, givenColor, onChange }) => {
  return (
    <Box
      display="flex"
      key="1"
      backgroundColor={getColor(givenColor)}
      color="white"
      justifyContent="center"
      alignItems="center"
      width={10}
      minW={10}
      minH={10}
      height={10}
      borderRadius={9}
      onClick={() => {
        givenColor === "0"
          ? onChange("1")
          : givenColor === "1"
          ? onChange("2")
          : onChange("0");
      }}
    >
      <Text casing="capitalize" fontWeight="bold">
        {letter}
      </Text>
    </Box>
  );
};
