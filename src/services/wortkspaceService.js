import ENVIRONMENT from "../config/env.config.js";
import { LOCALSTORAGE_TOKEN_KEY } from "../Context/AuthContext.jsx";



export async function getWorkspace() {
    const res_http = await fetch(ENVIRONMENT.API_URL + '/api/workspace', {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
        }
    })

    const res_json = await res_http.json()
    //console.log(res_json);
    return res_json
}
