import {login} from "../../api/authApi"
import {LOGIN_KEY, PASSWORD_KEY, TOKEN_KEY, ACCESS_TOKEN_EXPIRATION_TIME_KEY} from "../../constants/tokenConstants";
import {setData} from "../holder/tokenHolder"

export async function updateToken() {
    let date = Math.round(new Date().getTime()/1000)
    if(date > sessionStorage.getItem(ACCESS_TOKEN_EXPIRATION_TIME_KEY)) {
        await login({
            username: sessionStorage.getItem(LOGIN_KEY),
            password: sessionStorage.getItem(PASSWORD_KEY)
        }).then(result => {
            setData(
                sessionStorage.getItem(LOGIN_KEY),
                sessionStorage.getItem(PASSWORD_KEY),
                result
            )})
    }
}