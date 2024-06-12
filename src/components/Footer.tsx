import React from "react";
import { styled } from "styled-components";
import { colors } from "../util/theme";

const SectionFooter = styled.div`
  background: ${colors.black};
  color: ${colors.white};
  text-align: center;
  font-size: 18px;
  padding: 50px 0;
`;

const Footer = () => {
  return (
    <SectionFooter>
      &copy; {new Date(Date.now()).getUTCFullYear()} Student management system. All rights
      reserved.
    </SectionFooter>
  );
};

export default Footer;
