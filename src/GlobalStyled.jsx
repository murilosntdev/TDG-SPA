import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: Roboto, sans-serif;
        margin: 0;
        padding: 0;
    }

    html {
        width: auto;
    }

    body {
        height: 100vh;
        max-width: 100vw;
    }
`