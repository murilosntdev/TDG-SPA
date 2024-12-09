import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyled } from "./GlobalStyled";
import { ThemeProvider } from "styled-components";
import theme from "./themes/theme";
import MainRoutes from "./routes";

function App() {
  return (
    <>
      <GlobalStyled />
      <ThemeProvider theme={theme}>
        <Router>
          <MainRoutes />
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
