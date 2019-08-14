import axios from "axios";
import {
  GET_ERRORS,
 
} from "./types";
//assaign available slots
export const createSlot = (data, history) => dispatch => {

  console.log('#########route',data)
  axios
    .post("/api/doctor/createslot", data)
    .then(res => history.push("/")) // re-direct to same page on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

