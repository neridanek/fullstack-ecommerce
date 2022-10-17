import { fireEvent, render, screen } from "@testing-library/react";
import Login from "../pages/login";

test("renders title", () => {
  render(<Login />);
  const title = screen.getByDisplayValue(/login/i);
  expect(title).toBeInTheDocument();
});

test("email input should be rendered", () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText(/email/i);
  expect(emailInput).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Login />);
  const pswdInput = screen.getByPlaceholderText(/password/i);
  expect(pswdInput).toBeInTheDocument();
});

test("button should be rendered", () => {
  render(<Login />);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

test("email input should be empty", () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText<HTMLInputElement>(/email/i);
  expect(emailInput.value).toBe("");
});

test("password input should be empty", () => {
  render(<Login />);
  const pswdInput = screen.getByPlaceholderText<HTMLInputElement>(/password/i);
  expect(pswdInput.value).toBe("");
});

test("button shoud be disabled", () => {
  render(<Login />);
  const button = screen.getByRole("button");
  expect(button).toBeDisabled();
});

test("email input should change", () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText<HTMLInputElement>(/email/i);
  const testValue = "test";
  fireEvent.change(emailInput, { target: { value: testValue } });
  expect(emailInput.value).toBe(testValue);
});
test("password input should change", () => {
  render(<Login />);
  const pswdInput = screen.getByPlaceholderText<HTMLInputElement>(/password/i);
  const testValue = "test";
  fireEvent.change(pswdInput, { target: { value: testValue } });
  expect(pswdInput.value).toBe(testValue);
});

test("button shoud not be disabled when inputs well filled", () => {
  render(<Login />);
  const button = screen.getByRole("button");
  const pswdInput = screen.getByPlaceholderText(/password/i);
  const emailInput = screen.getByPlaceholderText(/email/i);

  const testValue = "test";

  fireEvent.change(emailInput, { target: { value: testValue } });
  fireEvent.change(pswdInput, { target: { value: testValue } });

  expect(button).not.toBeDisabled();
});
