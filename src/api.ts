import axios from "axios";

const apiRootUrl = process.env.API_BASE_URL;
const apiKey = process.env.OPENSERV_API_KEY;

if (!apiRootUrl) {
  throw new Error("API_BASE_URL is not set");
}

if (!apiKey) {
  throw new Error("OPENSERV_API_KEY is not set");
}

export const apiClient = axios.create({
  baseURL: apiRootUrl,
  headers: {
    "x-openserv-key": apiKey,
  },
});
