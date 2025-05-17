export { removemovie } from "../reducers/movieSlice";
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";

export const getMovieDetails = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/movie/${id}`);
        dispatch(loadmovie(data));
    } catch (error) {
        console.log(error);
    }
};

