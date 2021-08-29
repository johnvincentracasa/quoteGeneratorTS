import React, { useState, useEffect } from "react";
import "./App.css";

const API =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

type IQuote = {
  quote: string;
  author: string;
};

const COLOR = [
  "#D8A7B1",
  "#B6E2D3",
  "#FAE8E0",
  "#EF7C8E",
  "#887BB0",
  "#85D2D0",
  "#F4B9B8",
  "#FFF4BD",
];

const App = () => {
  const [quotes, setQuotes] = useState<IQuote[] | null>(null);
  const [index, setIndex] = useState<number>(0);

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
  };

  const handleNewColor = () => {};

  let quote = quotes ? quotes[index].quote : "";

  let author = quotes ? quotes[index].author : "";

  return (
    <div className="app">
      <div className={`quote__container`} id="quote-box">
        <div className="quote__preview">
          <h1 id="text">" {quote} "</h1>
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
              <button className="fa fa-twitter" aria-hidden="true">
                {" "}
              </button>
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="fa fa-facebook" aria-hidden="true"></button>
            </a>
          </div>
          <div className="btn__fetchNewQuote">
            <button id="new-quote" onClick={handleNewQuote}>
              {" "}
              New quote
            </button>
          </div>
        </div>
      </div>

      <footer className="quote__footer">
        <h6>by jv_racasa</h6>
      </footer>
    </div>
  );
};

export default App;
