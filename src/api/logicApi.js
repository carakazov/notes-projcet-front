import {getToken} from "../token/holder/tokenHolder";

export async function getPersonalData(externalId) {
    let token = await getToken()
    console.log(`token - ${token}`)
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/client/${externalId}`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    if(result.ok) {
        return await result.json()
    }
    return Promise.reject(result.status)
}

export async function getClientFolders() {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/client`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    if(result.ok) {
        return await result.json()
    }
    return Promise.reject(result)
}

export async function createNote(note) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/note`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(note)
    })
    if(result.ok) {
        return await result.json()
    }
    return Promise.reject(await result.json())
}

export async function readNote(externalId) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/note/${externalId}`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    if(result.ok) {
        return await result.json()
    }
    return Promise.reject(await result.json())
}

export async function readDirectory(externalId) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/directory/${externalId}`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    if(result.ok) {
        return await result.json()
    }
    return Promise.reject(await result.json())
}

export async function deleteNote(externalId) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/note/${externalId}`, {
        method: 'DELETE',
        headers: getHeaders(token)
    })
    if(result.ok) {
        return Promise.resolve()
    }
    return Promise.reject()
}

export async function createDirectory(directory) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/directory`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(directory)
    })
    if(result.ok) {
        return await result.json()
    }
    return Promise.reject(result)
}

export async function deleteFolder(externalId) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/directory/${externalId}`, {
        method: 'DELETE',
        headers: getHeaders(token)
    })
    if(result.ok) {
        return Promise.resolve()
    }
    return Promise.reject(result)
}

export async function noteUpdate(newNote, externalId) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/note/${externalId}`, {
        method: 'PUT',
        headers: getHeaders(token),
        body: JSON.stringify(newNote)
    })
    if(result.ok) {
        return Promise.resolve()
    }
    return Promise.reject()
}


function getHeaders(token) {
    return {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}