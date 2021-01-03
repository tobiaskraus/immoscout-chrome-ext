import { ScrapeResponse } from "../messages";

const getApiEndpoint = (localApi: boolean) =>
    localApi ? process.env.REACT_APP_API_ENDPOINT_LOCAL : process.env.REACT_APP_API_ENDPOINT;

const getHeaders = (localApi: boolean): Record<string, string> => ({
    "Content-Type": "application/json",
    Authorization: localApi
        ? `Bearer ${process.env.REACT_APP_AUTH_TOKEN_LOCAL}`
        : `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
});

export function saveProperty(data: ScrapeResponse, useLocalApi: boolean) {
    return fetch(`${getApiEndpoint(useLocalApi)}/properties`, {
        headers: getHeaders(useLocalApi),
        method: "POST",
        body: JSON.stringify(data),
    });
}
