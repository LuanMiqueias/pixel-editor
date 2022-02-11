import axios from "axios";

const api = axios.create({
//   baseURL: "http://localhost:3333/",
  baseURL: "https://pixel-editor-dev.herokuapp.com/",
});

export default api;
