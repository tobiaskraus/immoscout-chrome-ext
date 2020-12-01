import React, { useCallback, useState } from "react";
import { Message, ScrapeResponse } from "./messages";
import "./App.css";
import { saveExpose } from "./requests/requests";

function App() {
  const [scrapeResult, setScrapeResult] = useState<ScrapeResponse>();
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState("");

  const onScrapeClick = useCallback(() => {
    setWaiting(true);
    // send to ContentScript
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id === undefined) throw Error("tabs[0] not defined");
      chrome.tabs.sendMessage(tabs[0].id, Message.Scrape, onScrapeResult);
    });
  }, []);

  const onScrapeResult = (result: ScrapeResponse) => {
    setScrapeResult(result);
    setWaiting(false);
  };

  const onSaveClick = useCallback(() => {
    if (!scrapeResult) {
      console.error("no scrape result");
      return;
    }
    setWaiting(true);
    saveExpose(scrapeResult)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        setScrapeResult(undefined);
        setWaiting(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setWaiting(false);
      });
  }, [scrapeResult]);

  return (
    <div className="App">
      <header className="App-header">
        <img src="logo64.png" />
        <h1>Scraper</h1>
      </header>
      <div className="App-content">
        <button
          type="button"
          disabled={waiting}
          onClick={onScrapeClick}
          className="App-btn"
        >
          scrape!
        </button>
        {scrapeResult && (
          <button
            type="button"
            disabled={waiting}
            onClick={onSaveClick}
            className="App-btn"
          >
            save
          </button>
        )}
        {error && <div className="App-error">{error}</div>}
        <div className="App-scrape-result">
          {scrapeResult &&
            Object.entries(scrapeResult).map((entry) => (
              <p>
                <span className="App-key">{entry[0]}</span>
                <span className="App-value">{entry[1]}</span>
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
