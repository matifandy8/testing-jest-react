import { render, screen } from '@testing-library/react';
import App from './App';
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, wait } from "@testing-library/react";


it("should show validation on blur", async () => {
  const { getByLabelText, getByTestId } = render(<App />);
  const input = getByLabelText("Email");
  fireEvent.blur(input);
  await wait(() => {
    expect(getByTestId("emailError")).not.toBe(null);
    expect(getByTestId("emailError")).toHaveTextContent("Required");
  });
});


jest.mock("react-datepicker", () => props => (
  <input
    data-testid="mockedDateField"
    onChange={e => {
      props.onChange(e);
    }}
  />
));

test("should remove date error id we select date", async () => {
  const { getByText, getByTestId, queryByTestId } = render(<App />);
  const button = getByText("Submit");
  fireEvent.click(button);
  const mockedDateField = getByTestId("mockedDateField");
  fireEvent.change(mockedDateField, { target: { value: new Date() } });
  await wait(() => {
    expect(queryByTestId("dateError")).toBe(null);
  });
});