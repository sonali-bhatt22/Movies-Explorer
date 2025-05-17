export { removeperson } from "../reducers/personSlice";
import axios from "../../utils/axios";
import { loadperson } from "../reducers/personSlice";

export const getPersonDetails = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/person/${id}`);
        dispatch(loadperson(data));
    } catch (error) {
        console.log(error);
    }
};

