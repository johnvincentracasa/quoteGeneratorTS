import React, { useState, useEffect } from "react";
import "./App.css";

const API =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

type IQuote = {
  quote: string;
  author: string;
};

const COLOR: string[] = [
  "#F8AFA6",
  "#116530",
  "#A16AE8",
  "#E43D40",
  "#4297A0",
  "#2F5061",
  "#94C973",
  "#E1C340",
];

const whiteColor: string = "white";

const App = () => {
  const [quotes, setQuotes] = useState<IQuote[] | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [colorIndex, setColorIndex] = useState<number>(0);

  useEffect(() => {
    const fetchQuotes: () => Promise<void> = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        setQuotes(data.quotes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuotes();
  }, []);

  const handleNewQuote: () => void = () => {
    if (quotes) {
      setIndex(Math.floor(Math.random() * quotes.length));
    }

    handleNewColor();
  };

  const handleNewColor: () => void = () => {
    setColorIndex(Math.floor(Math.random() * COLOR.length));
  };

  let quote: string = quotes ? quotes[index].quote : "";

  let author: string = quotes ? quotes[index].author : "";

  let currentColor: string = COLOR[colorIndex];

  return (
    <div
      className="app"
      style={{ background: currentColor, color: currentColor }}
    >
      <div className="quote__container" id="quote-box">
        <div className="quote__preview">
          <h1 id="text">" {quote}"</h1>
          <h5 id="author">-- {author}</h5>
        </div>

        <div className="quote__btn--container">
          <div className="btn__share">
            <a
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
                '"' + quote + '" ' + author
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginRight: "5px" }}
            >
              <button
                className="fa fa-twitter"
                style={{ background: currentColor, color: whiteColor }}
                aria-hidden="true"
              ></button>
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="fa fa-facebook"
                style={{ background: currentColor, color: whiteColor }}
                aria-hidden="true"
              ></button>
            </a>
          </div>
          <div className="btn__fetchNewQuote">
            <button
              id="new-quote"
              onClick={handleNewQuote}
              style={{
                background: currentColor,
                fontWeight: 600,
                color: whiteColor,
              }}
            >
              New Quote
            </button>
          </div>
        </div>
      </div>

      <footer className="quote__footer">
        <h6 style={{ color: whiteColor }}>by jv_racasa</h6>
      </footer>
    </div>
  );
};

export default App;
