import { Message, ScrapeResponse } from "../messages/messages";
import "./contentscript.scss";
import { scrape } from "./scrape";

console.log("ImmoScout24 Scraper is connected");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // got message...
    const fromContentScript = !!sender.tab;
    const fromExtension = !sender.tab;

    if (fromExtension && Message.Scrape) {
        const scrapeResult: ScrapeResponse = scrape();
        console.log("send to extension", scrapeResult);
        // send to Extension
        sendResponse(scrapeResult);
    }
});
