import axios from 'axios';

import { headerToken } from '../config/core-configs';

/**
 * Http client wrapper
 * @param {String} apiURL 
 * @param {String} httpMethod 
 * @param {Object} body 
 * @returns any
 */
const httpRequset=async(apiURL,httpMethod="get",body={})=>{
    try{
        const data = await axios({
            url:apiURL,
            method:httpMethod,
            data:body,
            headers:{
                Authorization:`Bearer ${headerToken}`
            }
        });

        return data.data;

    } catch(ex){
        console.log("EX-",ex);
        return null;
    }
}

export {
    httpRequset
}