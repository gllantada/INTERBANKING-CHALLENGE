import classNames from "classnames";
import React from "react";
import Styles from "./styles.module.css";

type FromProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCleanBoard?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  inputRef: React.Ref<HTMLInputElement>;
  submitText: string;
  buttonText?: string;
  testID:string;
};
export const Form: React.FC<FromProps> = ({
  handleSubmit,
  inputRef,
  handleCleanBoard,
  submitText,
  buttonText,
  testID
}) => {
  return (
    <form
    data-testid={testID}
      onSubmit={handleSubmit}
      className={classNames(Styles.form, { [Styles.leftFrom]: buttonText })}
    >
      <input
        ref={inputRef}
        data-testid={buttonText?"input-text":"input-filter"}
        className={Styles.inputText}
        required={buttonText !== undefined}
        type="textInput"
        placeholder="Insert a phrase"
      />
      <button
        data-testid={buttonText?"save-button":"filter-button"}
        type="submit"
        className={classNames(Styles.button, Styles.buttonPrimary)}
      >
        {submitText}
      </button>
      {buttonText && (
        <button
          data-testid="clean-board-button"
          className={classNames(Styles.button, Styles.buttonSecondary)}
          onClick={handleCleanBoard}
        >
          {buttonText}
        </button>
      )}
    </form>
  );
};
