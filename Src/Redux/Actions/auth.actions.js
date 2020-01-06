import { fetchApi } from "../../Utils/api";
import { axiosDelete, axiosGet } from "../../Utils/axios"
const axios = require('axios')
import URL from '../../Config/URL'

const BASE_URL = URL.IP_BE.toString()

export const createNewUser = (payload) => {
    return async (dispatch) => {

        try {
          dispatch({
            type: "CREATE_USER_LOADING"
          });
          const response = await fetchApi("/auth/register/", "POST", payload, 200);
          const resGetUser = await axiosGet(BASE_URL + '/company/user/' + payload.username)
          
          if(response) {
            dispatch({
                type: "CREAT_USER_SUCCESS"
            });
            dispatch({
                type: "AUTH_USER_SUCCESS",
                token: response.responseBody.result.token
            });
            dispatch({
                type: "GET_USER_SUCCESS",
                payload: resGetUser.data.result[0]
            });

            return response;
          } else {
            throw response;
          }

        } catch (error) {
            dispatch({
                type: "CREAT_USER_FAIL",
                payload: error
            });
            return error;
        }
    }
}

export const loginUser = (payload) => {
    return async (dispatch) => {

        try {
          dispatch({
            type: "LOGIN_USER_LOADING"
          });
          const response = await fetchApi("/auth/signin/", "POST", payload, 200);
          const resGetUser = await axios.get(BASE_URL+'/auth/' + payload.noHp)
   
            
          if(response.responseBody.result.level === '1') {
            dispatch({
                type: "LOGIN_USER_SUCCESS",
            });
            dispatch({
                type: "AUTH_USER_SUCCESS",
                token: response.responseBody.result.token
            });
            dispatch({
                type: "GET_USER_SUCCESS",
                payload: resGetUser.data.result
            });
            return response;
          } else {
            throw response;
           
          }

        } catch (error) {
            dispatch({
                type: "LOGIN_USER_FAIL",
                payload: error
            });
            return error;
        }
    }
}

export const logoutUser = () => {
    return async (dispatch, getState) => {
        const state = getState();
    
        try {
            const {authReducer: {authData: {token}}} = state;
            const response = await axiosDelete("/auth/logout", token)
            dispatch({
                type: "USER_LOGGED_OUT_SUCCESS"
            });
        } catch (e) {
            console.log(e);
        }
    }
}
