import ENVIRONMENT from '../config/env.config.js';
import { LOCALSTORAGE_TOKEN_KEY } from '../Context/AuthContext.jsx';

export async function getMe() {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/user/me`,
        {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    return await response_http.json();
}

export async function updateProfile(data) {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/user/profile`,
        {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
    );

    return await response_http.json();
}

export async function uploadImage(file, folder = 'uploads') {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/file/upload`,
        {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        }
    );

    return await response_http.json();
}
