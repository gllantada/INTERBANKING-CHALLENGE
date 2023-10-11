import React from "react";
import {
  Screen,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import App from "./App";

function addPhrase(screen: Screen, text: string) {
  const inputText = screen.getByTestId("input-text");
  const addphraseButton = screen.getByTestId("save-button");

  fireEvent.change(inputText, { target: { value: text } });
  fireEvent.click(addphraseButton);
}

describe("App", () => {
  beforeEach(() => {});
  test("render both forms", () => {
    render(<App />);
    const phraseForm = screen.getByTestId("phrase-form");
    const filterForm = screen.getByTestId("filter-form");
    const addphraseButton = screen.getByTestId("save-button");
    // Do nothing just increase coverage
    fireEvent.click(addphraseButton);
    expect(phraseForm).toBeInTheDocument();
    expect(filterForm).toBeInTheDocument();
  });
  test("add text", () => {
    render(<App />);
    addPhrase(screen, "First Phrase");
    const phrase = screen.getByTestId("phrase-0");
    expect(phrase).toBeInTheDocument();
  });
  test("is saved as local and delete all text", async () => {
    render(<App />);
    var phrase = screen.getByTestId("phrase-0");
    addPhrase(screen, "new text to phrase");
    const secondPhrase = screen.getByTestId("phrase-1");
    expect(phrase).toBeInTheDocument();
    expect(secondPhrase).toBeInTheDocument();
    const cleanBoardButton = screen.getByTestId("clean-board-button");
    await fireEvent.click(cleanBoardButton);
    expect(screen.queryByTestId("phrase-0")).toBeNull();
  });
  test("add many phrase and test Filter and send empty filter and get all values", async () => {
    render(<App />);
    const phrases = [
      "First phrase",
      "second Phrase",
      "other phrase",
      "good work",
    ];
    phrases.forEach((phrase) => {
      addPhrase(screen, phrase);
    });
    expect(screen.getByTestId("phrase-3")).toBeInTheDocument();
    const filterInput = screen.getByTestId("input-filter");
    const filterButton = screen.getByTestId("filter-button");
    fireEvent.change(filterInput, { target: { value: "other" } });
    fireEvent.click(filterButton);

    const { getByText } = within(screen.getByTestId("phrase-0"));
    expect(getByText("other phrase")).toBeInTheDocument();
    fireEvent.change(filterInput, { target: { value: "" } });
    fireEvent.click(filterButton);
    expect(getByText("First phrase")).toBeInTheDocument();
  });
});
