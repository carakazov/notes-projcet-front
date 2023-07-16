import './companylogo.css'
import {ObjectsToDeleteContext} from "../../conxtexts/objectstodeletecontext/objectsToDeleteContext";
import {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {deleteLocalNote} from "../../starter/localStorageHelper";
import {CurrentNoteContext} from "../../conxtexts/currentnotecontext/currentNoteContext";
import {deleteFolder, deleteNote} from "../../api/logicApi";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";

export default function CompanyLogo() {
    const {isSelected, objectToDelete, hasSelected, setObjectToDelete} = useContext(ObjectsToDeleteContext)
    const {setReloadOnlyFolderTab, setTabToHide, setCurrentNote} = useContext(CurrentNoteContext)
    const {setFolderIdToReload} = useContext(GlobalContext)
    const [isLocalFolderInDeleteList, hasLocalFolderInDeleteList] = useState(false)
    const {t} = useTranslation()

    function deleteObjects() {
        let tabArr = []
        console.log(objectToDelete)
        for(let folderExternalId of objectToDelete.checkedFolders) {
            if(folderExternalId.includes('local')) {
                hasLocalFolderInDeleteList(true)
                setTimeout(() => hasLocalFolderInDeleteList(false), 3000)
                return
            } else {
                deleteFolder(folderExternalId).then(() => {
                    console.log('folder-deleted')
                    setTabToHide(tabArr)
                    setReloadOnlyFolderTab(true)
                    setCurrentNote(null)
                })
                    .catch()
            }
        }
        objectToDelete.checkedFolders = []
        for(let document of objectToDelete.checkedDocuments) {
            if(document.documentExternalId.includes('local-note')) {
                deleteLocalNote(document.documentExternalId)
                setFolderIdToReload(document.folderExternalId)
                setCurrentNote(null)
            } else {
                deleteNote(document.documentExternalId)
                    .then(() => {
                        setTabToHide(tabArr)
                        setReloadOnlyFolderTab(true)
                        setFolderIdToReload(document.folderExternalId)
                        setCurrentNote(null)
                    })
                    .catch(error => console.log(error))
            }
            tabArr.push(document.documentExternalId)
        }
        objectToDelete.checkedDocuments = []
        setTabToHide(tabArr)
        hasSelected(false)
        setCurrentNote(null)
        setObjectToDelete(objectToDelete)
    }

    const localFolderMessage = isLocalFolderInDeleteList ? <span className={'local-folder-message'}>{t('messages.canNotDeleteLocalFolder')}</span> : null
    const deleteButton = isSelected ? <button onClick={deleteObjects} className={'delete-button'}>{t('buttons.delete')}</button> : null

    return(
        <div className={'company-logo-header'}>
            <p className={'company-logo'}>.BSC Pricols</p>
            <div className={'delete-button-block'}>
                {localFolderMessage}
                {deleteButton}
            </div>
        </div>
    )
}