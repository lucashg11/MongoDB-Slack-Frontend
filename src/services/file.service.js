import ENVIRONMENT from '../config/env.config';
import { LOCALSTORAGE_TOKEN_KEY } from '../Context/AuthContext';

async function uploadFile(file_name, file) {
    const body = new FormData()
    body.append('file_name', file_name)
    body.append('file', file)
    const res_http = await fetch(`${ENVIRONMENT.API_URL}api/file/upload`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)}`
        },
        body: body
    })
    const response = await res_http.json()
    return response
}

export default uploadFile