import { GlobalStyled } from "./GlobalStyled";
import { ThemeProvider } from "styled-components";
import theme from "./themes/theme";

function App() {
  return (
    <>
      <GlobalStyled />
      <ThemeProvider theme={theme}>
      </ThemeProvider>
    </>
  );
};

export default App;
