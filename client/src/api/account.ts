import { URLS } from "../constants/urls"
import axios from 'axios'

export interface SignupDto {
    email: string,
    password: string
}

export async function signup(signupDto: SignupDto) {
    return await axios.post(URLS.BASE_URI + URLS.SIGNUP_ENDPOINT, signupDto)
}