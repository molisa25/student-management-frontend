import React from "react";
import { styled } from "styled-components";
import { breakpoints, colors } from "../../util/theme";

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoText = styled.a`
  margin: 0 0 0 5px !important;
  color: ${colors.white};
  font-weight: 600;
  font-size: 24px;
  text-decoration: none;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 18px;
  }
`;

const LogoIcon = () => {
  return (
    <>
      <LogoContainer>
        <LogoText href='/'>Student Management System</LogoText>
      </LogoContainer>
    </>
  );
};

export default LogoIcon;
