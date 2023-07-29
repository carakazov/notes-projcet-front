import {getToken} from "../token/holder/tokenHolder";

export async function getPersonalData(externalId) {
    let token = await getToken()
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

export async function moveNote(moveRequest) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/note`, {
        method: 'PUT',
        headers: getHeaders(token),
        body: JSON.stringify(moveRequest)
    })
    if(result.ok) {
        return Promise.resolve()
    }
    return Promise.reject()
}

export async function updateClient(body) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/client?createNew=true`, {
        method: 'PUT',
        headers: getHeaders(token),
        body: JSON.stringify(body)
    })
    if(result.ok) {
        return await result.json()
    }
    return Promise.reject(result.status)
}

export async function getAllClients() {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/client/list`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    if(result.ok) {
        return await result.json()
    }
    return Promise.reject()
}

export async function grantAccess(request) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/note/changeAccess`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(request)
    })
    if(result.ok) {
        return Promise.resolve()
    }
    return Promise.reject()
}

export async function getAllAccessors(externalId) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/note/${externalId}/accessors`, {
        method: 'GET',
        headers: getHeaders(token)
    })

    if(result.ok) {
        return await result.json()
    }
    return Promise.reject()
}

export async function denyNote(noteExternalId, userExternalId) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/note/deny?noteExternalId=${noteExternalId}&client=${userExternalId}`, {
        method: 'DELETE',
        headers: getHeaders(token)
    })
    if(result.ok) {
        return Promise.resolve()
    }
    return Promise.reject()
}

export async function getMyAccessedNotes() {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/note/myAccess`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    if(result.ok) {
        return await result.json()
    }

    return Promise.reject()
}

export async function changePassword(request) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_OAUTH_BACKEND_URL}/client/changePassword`, {
        method: 'PUT',
        headers: getHeaders(token),
        body: JSON.stringify(request)
    })

    if(result.ok) {
        return Promise.resolve()
    }

    return Promise.reject(result.status)
}

function getHeaders(token) {
    return {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}