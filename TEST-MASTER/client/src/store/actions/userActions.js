
import axios from "axios";
import {
    POST_DATA_REQUEST,
    POST_DATA_SUCCESS,
    POST_DATA_FAILURE,
  } from "../constants";
  

export const loginUser = (email,password) => async (dispatch) =>  {

    try {
        dispatch({type:POST_DATA_REQUEST});

        //const response = await axios.get

        
    } catch (error) {
        
    }


}