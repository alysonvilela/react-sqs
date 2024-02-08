/* eslint-disable react-refresh/only-export-components */
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../assets/styles/theme";
import GlobalStyled from "../assets/styles/global";

const renderWithTheme = (ui: JSX.Element, options?: RenderOptions) => {
  return render(
    <ThemeProvider theme={theme}>
      <GlobalStyled />
      {ui}
    </ThemeProvider>,
    options
  );
};

export * from "@testing-library/react";
export { renderWithTheme };
