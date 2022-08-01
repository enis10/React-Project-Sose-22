import axios from "axios";




/* Haupt Url für nachfragen */

const instance = axios.create(
    {
        baseURL  : "https://api.themoviedb.org/3"
        

    }
);

export default instance;





