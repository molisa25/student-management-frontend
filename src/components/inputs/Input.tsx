import styled from "styled-components";
import { colors } from "../../util/theme";

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 12px;
  & label {
    color: rgba(120, 126, 173, 0.75);
    font-size: 12px;
  }
`;

export const InputLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  color: white !important;
  width: max-content !important;
  & :after {
    content: '' !important;
    position: relative !important;
    width: 300px !important;
    margin-left: 10px !important;
    height: 1px !important;
    background: linear-gradient(to right, #33334c, transparent) !important;
    left: auto !important;
    opacity: 1 !important;
  }
`;

export const Input = styled.input<{
  width?: string;
}>`
  flex: 0 0 auto;
  color: ${colors.black};
  outline: none;
  width: ${(props) => props.width || "initial"};
  height: 48px;
  background: ${colors.white};
  border: 1px solid ${colors.grey};
  padding: 0 16px;
  margin-top: 4px;
  border-radius: 5px !important;
`;
