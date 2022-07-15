import React, { useState } from "react";

const Home = () => {
  const [link, setLink] = useState("");
  const [list, setList] = useState([]);
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // shorten logic
    fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setResult(data.result.full_short_link);
        setList((prevList) => [
          ...prevList,
          {
            longURL: link,
            shortURL: data.result.full_short_link,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <button>Copy To Clipboard</button>
            </div>
          ) : null}
        </div>

        <div className="listBox">
          {list.length === 0 ? null : <h3>Recent URLs</h3>}
          {list.map((item, index) => {
            return (
              <div className="listItem" key={index}>
                <p>
                  {index + 1}. {item.longURL}
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
