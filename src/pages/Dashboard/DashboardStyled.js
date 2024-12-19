import styled from "styled-components";
import { ScBttn } from "../../components/Button/ButtonStyled";

export const DashboardPage = styled.div`
    background-color: ${props => props.theme.colors.background};
    display: grid;
    grid-template-rows: auto 1fr;
    height: auto;
    min-height: 100vh;
`

export const Main = styled.main`
    align-items: stretch;
    display: grid;
    grid-template-rows: auto 1fr;
    justify-content: center;
    min-height: 100vh;
    padding: 6rem 2rem 2rem;

    ${ScBttn} {
        font-size: ${props => props.theme.fontSizes.large};
        height: 10rem;
        margin: 1rem;
        width: 50rem;
    }
`