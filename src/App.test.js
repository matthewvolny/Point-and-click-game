import { render, screen } from "@testing-library/react";
import App from "./App";

test("render title", () => {
  render(<App />);
  const pageTitle = screen.getByText(/Leaving Richard's Valley!/i);
  expect(pageTitle).toBeInTheDocument();
});
