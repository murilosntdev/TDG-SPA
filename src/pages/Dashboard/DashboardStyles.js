import styled from "styled-components";

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
    min-height: 100vh;
    padding: 6rem 2rem 2rem;
`