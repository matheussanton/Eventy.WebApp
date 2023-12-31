import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify';
// import { parseCookies } from 'nookies'
// import { AuthTokenError } from './errors/AuthTokenError'

// import { signOut } from '../contexts/AuthContext'

function setupAPIClient(ctx = undefined) {

    // let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'https://localhost:7213/api/',
        headers: {
            // Authorization: `Bearer ${cookies['@pizzapp.token']}`
            Authorization: localStorage.getItem('token')
        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if (error?.response?.status === 401) {
            // if (typeof window !== undefined) {
            //     signOut();
            // } else {
            //     return Promise.reject(new AuthTokenError());
            // }
            console.log('Erro 401')
        }

        return Promise.reject(error);

    })

    return api;
}

export const api = setupAPIClient();
