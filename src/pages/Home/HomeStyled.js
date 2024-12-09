import styled from "styled-components";

export const HomePage = styled.div`
    background-color: ${props => props.theme.colors.background};
    display: grid;
    grid-template-rows: auto 1fr;
    height: auto;
    min-height: 100vh;
`