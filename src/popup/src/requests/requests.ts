import { ScrapeResponse } from "../messages";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

const authToken = `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`;

const headers: Record<string, string> = {
  "Content-Type": "application/json",
  Authorization: authToken,
};

export function saveProperty(data: ScrapeResponse) {
  return fetch(`${apiEndpoint}/properties`, {
    headers,
    method: "POST",
    body: JSON.stringify(data),
  });
}
