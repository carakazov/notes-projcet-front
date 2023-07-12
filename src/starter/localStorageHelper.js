import {LOCAL_FOLDER} from "../constants/tokenConstants";

export function startLocalStorage() {
    let folder = {
        externalId: 'local-folder',
        title: 'Local Folder',
        notes: [{
            externalId: "local-note-1",
            title: "My local note",
            content: "My local note text"
        }]
    }
    localStorage.setItem(LOCAL_FOLDER, JSON.stringify(folder))

}

export function getLocalFolder() {
    return localStorage.getItem(LOCAL_FOLDER)
}