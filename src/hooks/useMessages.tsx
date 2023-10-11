import { useState, useEffect } from "react";

export type Message = {
  text: string;
};

export const useMessages = (): [
  Message[],
  (message: Message) => void,
  () => void,
  (filterText: string) => void,
  () => void
] => {
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    getSavedData();
  }, []);

  const updateLocalStorage = (messages: Message[]) => {
    window.localStorage.setItem("messages", JSON.stringify(messages));
  };

  const addMessage = (message: Message) => {
    const newMessages = [...messages, message];
    updateLocalStorage(newMessages);

    setMessages(newMessages);
  };
  const filterMessages = (filterText: string) => {
    const filterMessages = messages.filter(
      (message) => message.text.toLowerCase().indexOf(filterText) > -1
    );
    setMessages(filterMessages);
  };
  const getSavedData = () => {
    const messages = window.localStorage.getItem("messages");
    if (messages) {
      setMessages(JSON.parse(messages));
    }
  };
  const clearAllMessages = () => {
    window.localStorage.removeItem("messages");
    setMessages([]);
  };
  return [messages, addMessage, clearAllMessages, filterMessages, getSavedData];
};
