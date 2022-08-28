import axios from "axios";

export const baseURL = "https://economia.awesomeapi.com.br";

export const api = axios.create({
  baseURL,
});
