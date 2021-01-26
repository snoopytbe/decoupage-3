import React from "react";
import DateDepense from "./components/DateDepense";
import Formulaire from "./components/Formulaire";
import "./styles/styles.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./styles/styles";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>Hello CodeSandbox</h1>
        <DateDepense />
        <Formulaire />
      </div>
    </ThemeProvider>
  );
}
