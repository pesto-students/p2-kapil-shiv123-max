import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { validURL } from "../../util";
import "./style.css";
import ListItem from "../ListItem";
import ShortenerForm from "../ShortenerForm";
import * as Sentry from "@sentry/react";

const Home = () => {
  const [link, setLink] = useState("");
  const [list, setList] = useState(
    localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : []
  );
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setLink(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const checkDuplicate = (link, list) => {
    let isDuplicate = false;
    list.map((linkObj) => {
      if (linkObj.longURL === link) {
        isDuplicate = true;
      }
    });
    return isDuplicate;
  };

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
      Sentry.captureException("Invalid URL!");
      return;
    }
    if (checkDuplicate(link, list)) {
      toast.error("Link already shortened", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      Sentry.captureException("Link already shortened");
      return;
    }
    setLoading(true);
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
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
    setLink("");
  };

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
      <ShortenerForm
        link={link}
        result={result}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className="listBox">
        {list.length === 0 ? null : <h2>Recent URLs</h2>}
        {list?.map((item, index) => {
          return (
            <div className="listItemContainer">
              <ListItem deleteItem={deleteItem} item={item} index={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
