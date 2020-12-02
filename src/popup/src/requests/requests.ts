import { ScrapeResponse } from "../messages";

const apiEndpoint = "http://localhost:8080";

const authToken = "Bearer hjdfgzzdgzgzdfgffff__dd";

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
