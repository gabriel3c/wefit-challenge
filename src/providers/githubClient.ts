import axios from "axios";

const defaultConfig = {
  baseURL: "https://api.github.com/",
  withCredentials: true,
};

const githubClient = axios.create(defaultConfig);

export default githubClient;
