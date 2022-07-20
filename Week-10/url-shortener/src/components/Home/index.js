import React, { useState, useEffect } from "react";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [link, setLink] = useState("");
  const [list, setList] = useState(
    localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : []
  );
  const [result, setResult] = useState("");
  const handleChange = (e) => {
    setLink(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validURL(link) || link.length === 0) {
      toast.error("Invalid URL!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    // shorten logic
    await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
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
    setLink("");
  };

  const spliceLongURL = (longURL) => {
    return longURL.slice(0, 40) + "...";
  };

  function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(text);
    } else {
      document.execCommand("copy", true, text);
    }
    toast.success("Link Copied!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const deleteItem = (shortURL) => {
    const updatedList = JSON.parse(localStorage.getItem("list")).filter(
      (item) => item.shortURL !== shortURL
    );
    localStorage.setItem("list", JSON.stringify(updatedList));
    setList(updatedList);
  };

  return (
    <div className="homeContainer">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="dark-toast"
        theme="dark"
      />
      <div className="intro">
        <h1>URL Shortener</h1>
        <p>
          This is a free tool to shorten URLs. Create short & memorable links in
          seconds.
        </p>
      </div>
      <div className="shortenerBox">
        <form className="shortenForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={link}
            onChange={handleChange}
            placeholder="Paste a link here..."
            className="linkInput"
          />
          <button className="shortenButton" onClick={(e) => handleSubmit(e)}>
            Shorten URL
          </button>
        </form>
        {result ? (
          <div className="resultWrapper">
            <div className="resultText">{result}</div>
            <button
              className="shortenButton"
              onClick={() => copyTextToClipboard(result)}
            >
              Copy to Clipboard
            </button>
          </div>
        ) : null}
      </div>
      <div className="listBox">
        {list.length === 0 ? null : <h2>Recent URLs</h2>}
        {list?.map((item, index) => {
          return (
            <div className="listItemContainer">
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
