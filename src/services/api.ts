import axios from "axios";

const api = axios.create({
  baseURL: "https://pixel-editor-dev.herokuapp.com/",
});

export default api;
