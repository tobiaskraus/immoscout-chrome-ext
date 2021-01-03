import React, { useCallback, useState } from "react";
import { Message, ScrapeResponse } from "./messages";
import "./App.css";
import { saveProperty } from "./requests/requests";

function App() {
  const [scrapeResult, setScrapeResult] = useState<ScrapeResponse>();
  const [waiting, setWaiting] = useState(false);
  const [useLocalApi, setUseLocalApi] = useState(false);
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
    saveProperty(scrapeResult, useLocalApi)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        setScrapeResult(undefined);
        setWaiting(false);
      })
      .catch((error: Error) => {
        console.error(error.message);
        setError(`saveProperty request: ${error.message}`);
        setWaiting(false);
      });
  }, [scrapeResult]);

  return (
    <div className="App">
      <header className="App-header">
        <img src="logo64.png" alt="" />
        <h1>Scraper</h1>
      </header>
      <div>
          <label htmlFor="useLocalApi">
              <input type="checkbox" name="useLocalApi" id="useLocalApi" value={useLocalApi} onChange={(e) => setUseLocalApi(e.target.value)}/>
              local API
          </label>
      </div>
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
              <p key={entry[0]}>
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
