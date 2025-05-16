import axios from "axios"
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGU4MDMzZGIzMDk0MmFlNGJiOGM4MWUwYzZhYTI3NyIsIm5iZiI6MTczMTg0ODQ3OS43MDQsInN1YiI6IjY3MzllOTFmOWMxNmRhZmEwNmY5ZDBlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r6JzoN3ndkRrjgA8QDi_1yjI-bUJkueXLS8Wo6ql-4c'
    }
})


export default instance;