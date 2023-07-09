import {updateToken} from "../requester/tokenRequester";
import {
    LOGIN_KEY,
    PASSWORD_KEY,
    ACCESS_TOKEN_EXPIRATION_TIME_KEY,
    TOKEN_KEY, REFRESH_TOKEN, CURRENT_USER_DATA
} from "../../constants/tokenConstants";

export function setData(login, password, token) {
    let accessToken = token.access_token
    let expirationTime = token.expires_in
    sessionStorage.setItem(LOGIN_KEY, login)
    sessionStorage.setItem(PASSWORD_KEY, password)
    sessionStorage.setItem(TOKEN_KEY, accessToken)
    sessionStorage.setItem(ACCESS_TOKEN_EXPIRATION_TIME_KEY, expirationTime)
}

export function setCurrentUser(currentUser) {
    sessionStorage.setItem(CURRENT_USER_DATA, currentUser)
}

export async function getToken() {
    await updateToken()
    return sessionStorage.getItem(TOKEN_KEY)
}

export function deleteToken() {
    sessionStorage.removeItem(TOKEN_KEY)
}