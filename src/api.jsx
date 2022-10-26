import axios from "axios";
const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyAT2eZrM63jvSsUzClnXQ_ZTFOfvIeXB1Q",
  },
});

export default request;
