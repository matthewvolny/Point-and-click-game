import { render, screen } from "@testing-library/react";
import App from "./App";

test("render title", () => {
  render(<App />);
  const pageTitle = screen.getByText(/Leaving Richard's Valley/i);
  expect(pageTitle).toBeInTheDocument();
});

//"enableLink={false} is a test setting state, then seeing if the text is found"
// test("Does not render title", () => {
//   render(<App enableLink={false}/>);
//   const pageTitle = screen.queryByText(/Leaving Richard's Valley/i);
//   expect(pageTitle).not.toBeInTheDocument();
// });
