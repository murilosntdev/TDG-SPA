import styled from "styled-components";
import { ScBttn } from "../Button/ButtonStyled";

export const Ovrly = styled.div`
  align-items: center;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.5);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
`

export const MdlCntinr = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  padding: 2rem;
  position: relative;
`;

export const ClsBttn = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  font-size: 2rem;
  position: absolute;
  right: 0.7rem;
  top: 0.2rem;
`;

export const MdlCntnt = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Lgnd = styled.h1`
  color: ${props => props.theme.colors.secondary};
  font-size: ${props => props.theme.fontSizes.large};
  margin-bottom: 0.5rem;
`

export const RmsLst = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  ${ScBttn} {
    align-items: first baseline;
    display: flex;
    flex-direction: column;
    height: auto;
    margin: 0.5rem;
    min-width: 15rem;
    padding: 0.5rem;
  }
`

export const RmNm = styled.h1`
  font-size: ${props => props.theme.fontSizes.extraLarge};
`

export const RmPlyrs = styled.h2`
  font-size: ${props => props.theme.fontSizes.medium};
  text-align: end;
  width: 100%;
`

export const RmId = styled.h3`
  font-size: ${props => props.theme.fontSizes.small};
`