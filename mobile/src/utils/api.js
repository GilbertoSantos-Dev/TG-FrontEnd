import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.18.6:5000/api",
  //baseURL: "http://192.168.1.73:5000/api"
});

export default api;
