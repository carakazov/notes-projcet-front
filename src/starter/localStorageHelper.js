import {LOCAL_FOLDER} from "../constants/tokenConstants";

export function startLocalStorage() {
    if(!localStorage.getItem(LOCAL_FOLDER)) {
        let folder = {
            externalId: 'local-folder',
            title: 'Local Folder',
            notes: []
        }
        localStorage.setItem(LOCAL_FOLDER, JSON.stringify(folder))
    }
}

export function reloadLocalStorage() {
    return JSON.parse(localStorage.getItem(LOCAL_FOLDER))
}

export function getLocalNoteExternalId() {
    let folder = JSON.parse(localStorage.getItem(LOCAL_FOLDER))
    let number = folder.notes.length
    return `local-note-${++number}`
}

export function addLocalNote(note) {
    let folder = JSON.parse(localStorage.getItem(LOCAL_FOLDER))
    folder.notes.push(note)
    localStorage.setItem(LOCAL_FOLDER, JSON.stringify(folder))
}

export function deleteLocalNote(externalId) {
    let folder = JSON.parse(localStorage.getItem(LOCAL_FOLDER))
    folder.notes = folder.notes.filter(item => item.externalId !== externalId)
    localStorage.setItem(LOCAL_FOLDER, JSON.stringify(folder))
}

export function editLocalNote(externalId, content) {
    let folder = JSON.parse(localStorage.getItem(LOCAL_FOLDER))
    let objectIndex = folder.notes.findIndex(item => item.externalId === externalId)
    folder.notes[objectIndex].content = content
    localStorage.setItem(LOCAL_FOLDER, JSON.stringify(folder))
}