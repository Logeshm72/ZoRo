import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "emotion-theming";
import theme from "./theme";
import MainApp from "./App";
import { injectGlobal } from "react-emotion";

injectGlobal`
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");
    body{
      background-color:rgba(100,100,100,0.05);
      margin: 0;
    }
`;

const App = props => (
  <ThemeProvider theme={theme}>
    <MainApp />
  </ThemeProvider>
);
ReactDOM.render(<App />, document.getElementById("root"));