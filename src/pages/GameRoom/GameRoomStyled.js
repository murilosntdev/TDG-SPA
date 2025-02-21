import styled from "styled-components";

export const GameRoomPage = styled.div`
    align-items: center;
    background-color: ${props => props.theme.colors.background};
    display: flex;
    justify-content: center;
    height: auto;
    min-height: 100vh;
`

export const Main = styled.main`
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    max-width: 600px;
    padding: 20px;
    width: 100%;
`