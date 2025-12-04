import axios from "axios";

const instance = axios.create({
    baseURl: "https://api.themoviedb.org/3",
});

export default instance;