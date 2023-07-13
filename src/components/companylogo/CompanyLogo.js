import './companylogo.css'
import {ObjectsToDeleteContext} from "../../conxtexts/objectstodeletecontext/objectsToDeleteContext";
import {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {deleteLocalNote} from "../../starter/localStorageHelper";
import {CurrentNoteContext} from "../../conxtexts/currentnotecontext/currentNoteContext";

export default function CompanyLogo() {
    const {isSelected, objectToDelete, hasSelected} = useContext(ObjectsToDeleteContext)
    const {setReloadFolders, setTabToHide, setCurrentNote} = useContext(CurrentNoteContext)
    const [isLocalFolderInDeleteList, hasLocalFolderInDeleteList] = useState(false)
    const {t} = useTranslation()

    function deleteObjects() {
        for(let folderExternalId of objectToDelete.checkedFolders) {
            if(folderExternalId.includes('local')) {
                hasLocalFolderInDeleteList(true)
                setTimeout(() => hasLocalFolderInDeleteList(false), 3000)
                return
            }
            //Удаление папок на сервере
        }
        let tabArr = []
        for(let documentExternalId of objectToDelete.checkedDocuments) {
            if(documentExternalId.includes('local-note')) {
                deleteLocalNote(documentExternalId)
            }
            tabArr.push(documentExternalId)
        }
        setTabToHide(tabArr)
        setReloadFolders(true)
        hasSelected(false)
        setCurrentNote(null)
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