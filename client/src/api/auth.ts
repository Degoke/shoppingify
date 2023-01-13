import { URLS } from "../constants/urls"
import axios from 'axios'

export interface LoginDto {
    email: string,
    password: string
}

export async function login(loginDto: LoginDto) {
    try {
        return await axios.post(URLS.BASE_URI + URLS.LOGIN_ENDPOINT, loginDto)
    } catch(error) {
        throw error
    }
}