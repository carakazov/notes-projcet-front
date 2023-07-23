import './createfolder.css'
import {useContext, useState} from "react";
import {CreateFolderContext} from "../../conxtexts/createfoldercontext/createFolderContext";
import {useTranslation} from "react-i18next";
import {isStringEmpty} from "../../validators/stringValidator";

export default function CreateFolder() {
    const {setFolderTitle, hasFolderInCreation, createFolder, folderTitle} = useContext(CreateFolderContext)
    const [errorObject, setErrorObject] = useState({})
    const {t} = useTranslation()

    function save() {
        if(validate()) {
            createFolder()
        }
    }

    function validate() {
        let correct = true
        let error = {}
        if(isStringEmpty(folderTitle)) {
            error.folderTitleRequired = t('messages.itIsRequiredField')
            correct = false
        }
        if(folderTitle.length > 125) {
            error.folderTitleTooLong = `${t('messages.maxLength')} 125`
            correct = false
        }
        setErrorObject(error)
        return correct
    }

    function cancel() {
        hasFolderInCreation(false)
    }

    return(
        <div className={'create-folder-form'}>
            <input className={'create-form-input'} type={'text'} placeholder={t('placeholders.title')} onChange={e => setFolderTitle(e.currentTarget.value)}/>
            <p className={'required-field-message'}>{errorObject?.folderTitleTooLong}</p>
            <p className={'required-field-message'}>{errorObject?.folderTitleRequired}</p>
            <div className={'create-folder-buttons'}>
                <button className={'create-folder-button'} onClick={save}>{t('buttons.save')}</button>
                <button className={'create-folder-button'} onClick={cancel}>{t('buttons.cancel')}</button>
            </div>
        </div>
    )
}