import { render, screen } from "@testing-library/react";
import App from "./App";
import Login from "../src/components/Login";
import Room1 from "../src/components/rooms/Room1";

test("render title", () => {
  render(<App />);
  const pageTitle = screen.getByText(/Leaving Richard's Valley/i);
  expect(pageTitle).toBeInTheDocument();
});

test("render login input", async () => {
  render(<Login />);
  const formInputName = screen.getByPlaceholderText("name");
  expect(formInputName).toBeInTheDocument();
});

//conditionally renders login text when passed a user Id
test("pass props to Login component", () => {
  render(<Login userId="1234" />);
  const loginForm = screen.getByText(/Login to continue your game/i);
  expect(loginForm).toBeInTheDocument();
});

// test("render Room1 image", () => {
//   render(<Room1 />);
//   const room1Image = screen.getByAltText("background");
//   expect(room1Image).toBeInTheDocument();
// });

// test("render login form", () => {
//   render(<Login />);
//   const { loginForm } = render(<Login variant="default" />);
//   expect(loginForm.firstChild).toHaveClass("login-heading");
// });

// test("user logged in", () => {
//   render(<App />);
// });
//"enableLink={false} is a test setting state, then seeing if the text is found"
// test("Does not render title", () => {
//   render(<App enableLink={false}/>);
//   const pageTitle = screen.queryByText(/Leaving Richard's Valley/i);
//   expect(pageTitle).not.toBeInTheDocument();
// });
