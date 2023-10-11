import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ShowMessages } from "./index";

describe("ShowMessages", () => {
  const messages = [
    { text: "first text" },
    { text: "second text" },
    { text: "third text" },
  ];
  test("simulate click to css changes", () => {
    render(<ShowMessages messages={messages} />);
    const lastCard = screen.getByTestId("phrase-2");
    expect(lastCard.className).toBe("card");
    fireEvent.click(lastCard);
    expect(lastCard.className).toBe("card animatedCard");
    fireEvent.mouseLeave(lastCard);
    expect(lastCard.className).toBe("card");
  });
});
