import React, { FC } from "react";
import { PinInput, PinInputField } from "@chakra-ui/react";

type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
};
export const TextInput: FC<TextInputProps> = ({ value, onChange }) => (
  <PinInput
    placeholder=""
    type="alphanumeric"
    defaultValue=""
    id="inputfield"
    value={value}
    onChange={onChange}
  >
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
);
