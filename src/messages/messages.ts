/**
 * This file should be kept in sync in
 * - /src/popup/src/
 * - /src/messages/
 */

export enum Message {
    Scrape = "Scrape",
}

export interface ScrapeResponse {
    scout_id: string;
    [key: string]: unknown;
}
