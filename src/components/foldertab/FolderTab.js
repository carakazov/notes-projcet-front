import './foldertab.css'
import {FolderContext} from "../../conxtexts/foldercontext/folderContext";
import {useContext, useEffect, useState} from "react";
import '../folder/Folder'
import Folder from "../folder/Folder";
import {CurrentNoteContext} from "../../conxtexts/currentnotecontext/currentNoteContext";
import {ObjectsToDeleteContext} from "../../conxtexts/objectstodeletecontext/objectsToDeleteContext";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";
import {useTranslation} from "react-i18next";
import {CreateFolderContext} from "../../conxtexts/createfoldercontext/createFolderContext";
import CreateFolder from "../createfolder/CreateFolder";
import {createDirectory} from "../../api/logicApi";

export default function FolderTab() {
    const {folders, setReloadFolders} = useContext(CurrentNoteContext)
    const {hasSelected, setObjectToDelete} = useContext(ObjectsToDeleteContext)
    const {handleFatalError} = useContext(GlobalContext)
    const [folderData, setFolderData] = useState({
        checkedFolders: [],
        checkedDocuments: []
    })
    const {userData} = useContext(GlobalContext)
    const {t} = useTranslation()
    const [isFolderInCreation, hasFolderInCreation] = useState(false)
    const [folderTitle, setFolderTitle] = useState("")

    function checkLists() {
        if(folderData.checkedFolders.length === 0 && folderData.checkedDocuments.length === 0) {
            hasSelected(false)
        }
    }

    function removeDocument(externalId) {
        folderData.checkedDocuments = folderData.checkedDocuments.filter(item=> item.documentExternalId !== externalId)
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

    function addDocument(documentExternalId, folderExternalId) {
        folderData.checkedDocuments.push({documentExternalId, folderExternalId})
        setFolderData(folderData)
        setObjectToDelete(folderData)
    }

    function addFolder(externalId) {
        folderData.checkedFolders.push(externalId)
        setFolderData(folderData)
        setObjectToDelete(folderData)
    }

    function createFolder() {
        let directory = {
            directoryName: folderTitle
        }
        createDirectory(directory).then(() => {
            setReloadFolders(true)
            hasFolderInCreation(false)
        })
            .catch(() => handleFatalError())
    }

    const createFolderBlock = userData ? (isFolderInCreation ? <CreateFolder/> : <p className={'create-folder'} onClick={() => hasFolderInCreation(true)}>{t('labels.createFolder')}</p>) : null

    return(
        <div className={'folder-tab'}>
            <FolderContext.Provider value={{folderData, addDocument, addFolder, removeDocument, removeFolder}}>
                <div>
                    {folders.map(item => <Folder folder={item} key={item?.externalId}/>)}
                </div>
                <CreateFolderContext.Provider value={{hasFolderInCreation, setFolderTitle, createFolder, folderTitle}}>
                    {createFolderBlock}
                </CreateFolderContext.Provider>
            </FolderContext.Provider>
        </div>
    )
}