import React, { ReactElement } from "react";
import styled from "styled-components";
import { colors } from "../../util/theme";
import { ButtonSize } from "../../util/button";

const Button = styled.button<{
  textColor?: string;
  backgroundColor?: string;
  width?: string;
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 16px;
  background: ${(props) => !props.disabled ? (props.backgroundColor || colors.black) : colors.grey};
  border-radius: 8px;
  color: ${(props) => props.textColor || colors.white};
  padding: 0 36px;
  border: none;
  width: ${(props) => props.width || "initial"};
  height: 50px;
  cursor: pointer;
`;

const FilledButton = ({
  textColor,
  backgroundColor,
  text,
  size,
  onClick,
    isDisabled
}: {
  textColor?: string;
  backgroundColor?: string;
  text: ReactElement | string;
  size?: ButtonSize;
  onClick?: () => void;
  isDisabled?: boolean;
}) => {
  return (
    <Button
      textColor={textColor}
      backgroundColor={backgroundColor}
      width={size}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </Button>
  );
};

export default FilledButton;
