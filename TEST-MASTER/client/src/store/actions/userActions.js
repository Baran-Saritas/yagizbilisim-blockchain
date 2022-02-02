
import axios from "axios";
import {
    POST_DATA_REQUEST,
    POST_DATA_SUCCESS,
    POST_DATA_FAILURE,
  } from "../constants";
  

export const loginUser = (username, password) => async (dispatch) =>  {  // register 

    try {
       dispatch({type:POST_DATA_REQUEST});
        
        console.log("client req",{username,password});

        const response = await axios.post("http://localhost:8080/users", 
        {   username,
            password,
            email:"asd",
            publicKey:"234235236",
            privateKey:"2352436342634",
        })
        console.log("sonuc ",response.status);

        dispatch({type:POST_DATA_SUCCESS});
    } catch (error) {
        
        dispatch({type: POST_DATA_FAILURE});
    }


}