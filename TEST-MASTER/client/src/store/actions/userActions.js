
import axios from "axios";
import {
    POST_DATA_REQUEST,
    POST_DATA_SUCCESS,
    POST_DATA_FAILURE,
  } from "../constants";
  

export const loginUser = (username, password) => async (dispatch) =>  {

    try {
        dispatch({type:POST_DATA_REQUEST});
        let id= 11;
        console.log("client req",{id,username,password});

        const response = await axios.post("http://localhost:8080/users", {id:11,username,password,})
        console.log("sonuc ",response);
        /*1fetch("http://localhost:8080/users")
        .then(res => res.json())
        .then(
            (response)=>{
                console.log(response);
                
            }

        ) */
        dispatch({type:POST_DATA_SUCCESS});
    } catch (error) {
        
        dispatch({type: POST_DATA_FAILURE});
    }


}