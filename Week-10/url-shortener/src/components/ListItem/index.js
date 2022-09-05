import React from "react";
import { copyTextToClipboard, spliceLongURL } from "../../util";

const ListItem = ({ item, index, deleteItem }) => {
  return (
    <>
      <div className="listItem" key={index}>
        <p className="longURL">{spliceLongURL(item.longURL)}</p>
        <a
          rel="noreferrer"
          target="_blank"
          href={item.shortURL}
          className="shortURL"
        >
          {item.shortURL}
        </a>
        <button
          onClick={() => {
            copyTextToClipboard(item.shortURL);
          }}
          className="listButton"
        >
          Copy
        </button>
      </div>
      <span onClick={() => deleteItem(item.shortURL)}>X</span>
    </>
  );
};

export default ListItem;
