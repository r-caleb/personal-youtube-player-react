import axios from "axios";
const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyAiVnUaM6uV3QGq7LUv33_XG3yeNd0ONHI",
  },
});

export default request;
