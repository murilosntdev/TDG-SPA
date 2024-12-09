import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nvbr = styled.nav`
    align-items: center;
    background-color: ${props => props.theme.colors.primary};
    box-shadow: 0px 10px 10px -8px ${props => props.theme.colors.background};
    display: flex;
    justify-content: space-between;
    padding: 1rem 4rem;
    position: fixed;
    top: 0;
    width: 100vw;
`

export const Lnk = styled(Link)`
    display: flex;
`

export const LgImg = styled.img`
    cursor: pointer;
    object-fit: cover;
    width: 14rem;
`