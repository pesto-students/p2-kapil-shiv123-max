import React, { useState, useEffect } from "react";
import "./style.css";

const Home = () => {
  const [link, setLink] = useState("");
  const [list, setList] = useState(
    localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : []
  );
  const [result, setResult] = useState("");
  const [copyText, setCopyText] = useState("Copy To Clipboard");
  const handleChange = (e) => {
    setLink(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // shorten logic
    fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let newList;
        setResult(data.result.full_short_link);
        setList((prevList) => {
          newList = [
            ...prevList,
            {
              longURL: link,
              shortURL: data.result.full_short_link,
            },
          ];
          return newList;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const spliceLongURL = (longURL) => {
    return longURL.slice(0, 50) + "...";
  };

  function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      // setCopyText("Copied to Clipboard");
      navigator.clipboard.writeText(text);
    } else {
      document.execCommand("copy", true, text);
    }
    setCopyText("Copied to Clipboard");
  }

  return (
    <div className="homeContainer">
      <h1>URL Shortener</h1>
      <p>
        This is a free tool to shorten URLs. Create short & memorable links in
        seconds.
      </p>
      <div className="shortenerBox">
        <p>Paste a link to shorten it</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={link}
            onChange={handleChange}
            placeholder="Paste a link here..."
          />
          <button onClick={(e) => handleSubmit(e)}>Shorten</button>
        </form>
        <div className="resultWrapper">
          {result ? (
            <div className="result">
              <div>{result}</div>
              <button onClick={() => copyTextToClipboard(result)}>
                {copyText}
              </button>
            </div>
          ) : null}
        </div>

        <div className="listBox">
          {/* {JSON.parse(localStorage.getItem("list")).length === 0 ? null : (
            <h3>Recent URLs</h3>
          )} */}
          {list?.map((item, index) => {
            return (
              <div className="listItem" key={index}>
                <p>
                  {index + 1}. {spliceLongURL(item.longURL)}
                </p>
                <p>{item.shortURL}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
