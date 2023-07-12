import './foldertab.css'
import {FolderContext} from "../foldercontext/folderContext";
import {useContext, useState} from "react";
import {AuthContext} from "../../conxtexts/authcontext/authContext";
import '../folder/Folder'
import Folder from "../folder/Folder";
import {LOCAL_FOLDER} from "../../constants/tokenConstants";

export default function FolderTab() {
    const [folders, setFolders] = useState([JSON.parse(localStorage.getItem(LOCAL_FOLDER))])

    const [folderData, setFolderData] = useState({
        checkedFolders: [],
        checkedDocuments: []
    })
    const {currentUserData} = useContext(AuthContext)


    function removeDocument(externalId) {
        folderData.checkedDocuments = folderData.checkedDocuments.filter(item => item !== externalId)
        setFolderData(folderData)
    }

    function removeFolder(externalId) {
        folderData.checkedFolders = folderData.checkedFolders.filter(item => item !== externalId)
        setFolderData(folderData)
    }

    function addDocument(externalId) {
        folderData.checkedDocuments.push(externalId)
        setFolderData(folderData)
    }

    function addFolder(externalId) {
        folderData.checkedFolders.push(externalId)
        setFolderData(folderData)
    }

    return(
        <div className={'folder-tab'}>
            <FolderContext.Provider value={{folderData, addDocument, addFolder, removeDocument, removeFolder}}>
                {folders.map(item => <Folder folder={item}/>)}
            </FolderContext.Provider>
        </div>
    )
}