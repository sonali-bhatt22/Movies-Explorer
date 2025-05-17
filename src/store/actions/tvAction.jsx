export { removetv } from "../reducers/tvSlice";
import axios from "../../utils/axios";
import { loadtv } from "../reducers/tvSlice";

export const getTvDetails = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/tv/${id}`);
        dispatch(loadtv(data));
    } catch (error) {
        console.log(error);
    }
};

