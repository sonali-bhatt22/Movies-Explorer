export { removeperson } from "../reducers/personSlice";
import axios from "../../utils/axios";
import { loadperson } from "../reducers/personSlice";

export const aysncloadperson = (id) => async (dispatch, setState)=>{
   try {
    const detail = await axios.get(`/person/${id}`)
    const translations = await axios.get(`/person/${id}/translations`)
    const externalid = await axios.get(`/person/${id}/external_ids`)
    const comibinedCredits = await axios.get(`/person/${id}/combined_credits`)
    const latest = await axios.get(`/person/latest`)
    const movieCredits = await axios.get(`/person/${id}/movie_credits`)
    const tvCredits = await  axios.get(`/person/${id}/tv_credits`)
    let theultimatedetails = {
        detail: detail.data,
        translations: translations.data.translations.map(t => t.english_name),
        externalid: externalid.data,
        comibinedCredits: comibinedCredits.data,
        latest: latest.data.results,
        movieCredits: movieCredits.data.cast.map(e => e),
        tvCredits: tvCredits.data
    }
    dispatch(loadperson(theultimatedetails))

    console.log(theultimatedetails)
   } catch (error) {
    console.log("error: ", error)
   }
}