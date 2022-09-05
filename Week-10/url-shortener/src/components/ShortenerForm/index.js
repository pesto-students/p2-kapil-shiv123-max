import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { copyTextToClipboard } from "../../util";
import ReactGA from "react-ga";

const eventTrack = (category, action, label) => {
  console.log("Event tracked");
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

const ShortenerForm = ({
  link,
  loading,
  result,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="shortenerBox">
      <form className="shortenForm" onSubmit={handleSubmit}>
        <input
          type="text"
          value={link}
          onChange={handleChange}
          placeholder="Paste a link here..."
          className="linkInput"
        />
        <button
          type="submit"
          className="shortenButton"
          onClick={(e) => {
            handleSubmit(e);
            eventTrack("Button", "Button Clicked", "Button");
          }}
        >
          Shorten URL
        </button>
      </form>
      <ScaleLoader
        className="spinner"
        color="white"
        loading={loading}
        size={60}
      />
      {result ? (
        <>
          <div className="resultWrapper">
            <div className="resultText">{result}</div>
            <button
              className="shortenButton"
              onClick={() => copyTextToClipboard(result)}
            >
              Copy to Clipboard
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ShortenerForm;
