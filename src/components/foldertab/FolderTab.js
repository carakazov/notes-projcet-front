import './foldertab.css'
import {FolderContext} from "../../conxtexts/foldercontext/folderContext";
import {useContext, useState} from "react";
import '../folder/Folder'
import Folder from "../folder/Folder";
import {LOCAL_FOLDER} from "../../constants/tokenConstants";
import {CurrentNoteContext} from "../../conxtexts/currentnotecontext/currentNoteContext";
import {ObjectsToDeleteContext} from "../../conxtexts/objectstodeletecontext/objectsToDeleteContext";

export default function FolderTab() {
    const {folders} = useContext(CurrentNoteContext)
    const {hasSelected, setObjectToDelete} = useContext(ObjectsToDeleteContext)
    const [folderData, setFolderData] = useState({
        checkedFolders: [],
        checkedDocuments: []
    })

    function checkLists() {
        if(folderData.checkedFolders.length === 0 && folderData.checkedDocuments.length === 0) {
            hasSelected(false)
        }
    }

    function removeDocument(externalId) {
        folderData.checkedDocuments = folderData.checkedDocuments.filter(item => item !== externalId)
        setFolderData(folderData)
        setObjectToDelete(folderData)
        checkLists()
    }

    function removeFolder(externalId) {
        folderData.checkedFolders = folderData.checkedFolders.filter(item => item !== externalId)
        setFolderData(folderData)
        setObjectToDelete(folderData)
        checkLists()
    }

    function addDocument(externalId) {
        folderData.checkedDocuments.push(externalId)
        setFolderData(folderData)
        setObjectToDelete(folderData)
    }

    function addFolder(externalId) {
        folderData.checkedFolders.push(externalId)
        setFolderData(folderData)
        setObjectToDelete(folderData)
    }

    return(
        <div className={'folder-tab'}>
            <FolderContext.Provider value={{folderData, addDocument, addFolder, removeDocument, removeFolder}}>
                {folders.map(item => <Folder folder={item} key={item.externalId}/>)}
            </FolderContext.Provider>
        </div>
    )
}