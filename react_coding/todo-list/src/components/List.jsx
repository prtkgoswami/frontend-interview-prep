import React from "react";
import "./List.css";
import { useRef } from "react";
import { useEffect } from "react";

const List = ({ listItems, onDeleteItem, onMarkChange }) => {
  const listEndRef = useRef(null);

  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [listItems]);

  return (
    <ul>
      {listItems.map((item) => (
        <li key={item.id}>
          <input
            type="checkbox"
            name="input-is-done"
            checked={item.isDone}
            onChange={() => onMarkChange(item.id)}
          />
          <p>{item.text}</p>
          <button onClick={() => onDeleteItem(item.id)}>✕</button>
        </li>
      ))}
      <div ref={listEndRef} />
    </ul>
  );
};

export default List;
