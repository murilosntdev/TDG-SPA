import styled from "styled-components";

export const PasswordResetPage = styled.div`
    background-color: ${props => props.theme.colors.background};
    display: grid;
    grid-template-rows: auto 1fr;
    height: auto;
    min-height: 100vh;
`

export const Main = styled.main`
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    padding: 6rem 2rem 2rem;
`

export const Section = styled.section`
    align-items: center;
    display: flex;
    justify-content: center;
`