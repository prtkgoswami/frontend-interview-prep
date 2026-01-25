import { useState } from "react";
import "./App.css";
import List from "./components/List";

function App() {
  const [listItems, setListItems] = useState([
    {
      id: crypto.randomUUID(),
      text: "Buy some groceries today.",
      isDone: false,
    },
    {
      id: crypto.randomUUID(),
      text: "Walk the dog in the park.",
      isDone: false,
    },
    {
      id: crypto.randomUUID(),
      text: "Finish the React project.",
      isDone: false,
    },
    {
      id: crypto.randomUUID(),
      text: "Read a book for an hour.",
      isDone: false,
    },
    { id: crypto.randomUUID(), text: "Call mom this evening.", isDone: true },
  ]);

  const handleAddItem = (item) => {
    if (!item) return;
    setListItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: item.trim(), isDone: false },
    ]);
  };

  const handleDeleteItem = (id) => {
    setListItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMarkChange = (id) => {
    setListItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          item.isDone = !item.isDone;
        }
        return item;
      }),
    );
  };

  return (
    <main>
      <div id="list-container">
        <List
          listItems={listItems}
          onDeleteItem={handleDeleteItem}
          onMarkChange={handleMarkChange}
        />
      </div>

      <div id="input-container">
        <label htmlFor="new-item-input">
          New Item
          <input
            type="text"
            name="new-item"
            id="new-item-input"
            placeholder="Add new item here..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddItem(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </label>
      </div>
    </main>
  );
}

export default App;
