import React, { useEffect, useRef } from "react";

const SearchBox = ({ onSearch }) => {
  const timerRef = useRef(null);

  const handleQueryChange = (event) => {
    const text = event.target.value;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onSearch(text);
    }, 500);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        name=""
        data-testid="search-input"
        onChange={handleQueryChange}
      />
    </div>
  );
};

export default SearchBox;
