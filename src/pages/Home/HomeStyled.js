import styled from "styled-components";

export const HomePage = styled.div`
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

export const Text = styled.p`
    color: ${props => props.theme.colors.secondary};
    font-size: ${props => props.theme.fontSizes.medium};
    margin: auto;
    text-align: center;
`

export const Section = styled.section`
    align-items: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 2rem;
`