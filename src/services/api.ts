import axios from "axios";

const api = axios.create({
  baseURL: "https://pixel-editor-api.herokuapp.com/",
});

export default api;
