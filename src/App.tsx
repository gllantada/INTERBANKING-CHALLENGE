import React, {  useRef } from "react";
import { useMessages } from "./hooks/useMessages";
import { ShowMessages } from "./components/ShowMessages";
import { Form } from "./components/Form";
import Styles from "./app.module.css";

const App: React.FC<{}> = () => {
  const [messages, addMessage, clearAllMessages, filterMessages, getSavedData] =
    useMessages();
  const InputRef = useRef<HTMLInputElement>(null);
  const FilterRef = useRef<HTMLInputElement>(null);

  const handleSave = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (InputRef.current?.value) {
      const { value } = InputRef.current;
      value && addMessage({ text: value });
      InputRef.current.value = "";
    }
  };
  const handleCleanBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearAllMessages();
  };
  const handleFilter = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (FilterRef.current?.value) {
      filterMessages(FilterRef.current.value);
    } else {
      getSavedData();
    }
  };
  return (
    <div className="App">
      <header className="App-header"></header>
      <div className={Styles.formsContainer}>
        <Form
          testID="phrase-form"
          inputRef={InputRef}
          handleSubmit={handleSave}
          submitText="Save"
          buttonText="Clean Board"
          handleCleanBoard={handleCleanBoard}
        ></Form>
        <Form
          testID="filter-form"
          inputRef={FilterRef}
          handleSubmit={handleFilter}
          submitText="Search"
        ></Form>
      </div>
      {messages && <ShowMessages messages={messages} />}
    </div>
  );
};

export default App;
