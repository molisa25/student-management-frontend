import React, { ReactElement } from "react";
import styled from "styled-components";
import { colors } from "../../util/theme";
import { ButtonSize } from "../../util/button";

export const Button = styled.button<{
  textColor?: string;
  borderColor?: string;
  width?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 16px;
  background: transparent;
  border-radius: 8px;
  border: 1.5px solid ${(props) => props.borderColor || colors.black};
  color: ${(props) => props.textColor || colors.black};
  padding: 0 36px;
  width: ${(props) => props.width || "initial"};
  height: 50px;
  cursor: pointer;
`;

const OutlineButton = ({
  textColor,
  borderColor,
  text,
  size,
  onClick,
}: {
  textColor?: string;
  borderColor?: string;
  text: ReactElement | string;
  size?: ButtonSize;
  onClick?: () => void;
}) => {
  return (
    <Button textColor={textColor} borderColor={borderColor} width={size} onClick={onClick}>
      {text}
    </Button>
  );
};

export default OutlineButton;
