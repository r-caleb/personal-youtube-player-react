import axios from "axios";
const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyC2G1nwKcrNbnqWhHqboZ8aJoChNGLgJbo",
  },
});

export default request;
