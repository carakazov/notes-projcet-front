import {getToken} from "../token/holder/tokenHolder";

export async function getPersonalData(externalId) {
    let token = getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/${externalId}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer: ${token}`
        }
    })
    if(result.ok) {
        return await result.json()
    }
    return Promise.reject(result.status)
}