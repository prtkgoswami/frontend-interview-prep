import React, { useState } from "react";

const Folder = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFolderClick = (e) => {
    e.stopPropagation();
    if (data.type === "file") return;

    setIsExpanded((prev) => !prev);
  };

  return (
    <li
      className={`${data.type} ${isExpanded ? "expanded" : ""}`}
      role="treeitem"
    >
      <p
        onClick={handleFolderClick}
        aria-expanded={data.type === "folder" ? isExpanded : undefined}
        tabIndex={0}
      >
        <span className="icon">{data.type === "folder" ? "▶" : "▯"}</span>
        {data.name}
      </p>
      {data.type == "folder" && (
        <ul role="group">
          {data.children.length === 0 && (
            <li className="empty-text">Empty folder</li>
          )}
          {data.children.map((item) => (
            <Folder key={item.id} data={item} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Folder;
