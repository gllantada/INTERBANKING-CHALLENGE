import React, { useState } from "react";
import { Message } from "../../hooks/useMessages";
import classNames from "classnames";
import Styles from "./style.module.css";

export const ShowMessages: React.FC<{ messages: Message[] }> = ({
  messages,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <div className={Styles.cardContainer}>
      {messages.map((message: Message, i: number) => (
        <div
          className={classNames(Styles.card, {
            [Styles.animatedCard]: i === selectedIndex,
          })}
          key={i}
          data-testid={`phrase-${i}`}
          onClick={() => setSelectedIndex(i)}
          onMouseLeave={() => setSelectedIndex(-1)}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};
