import axios from "axios"

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "d4b7a744c81bc6332becd93cd1ef5fd2"
    }
})


export default instance;