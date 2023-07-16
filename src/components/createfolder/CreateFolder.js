import './createfolder.css'
import {useContext} from "react";
import {CreateFolderContext} from "../../conxtexts/createfoldercontext/createFolderContext";
import {useTranslation} from "react-i18next";

export default function CreateFolder() {
    const {setFolderTitle, hasFolderInCreation, createFolder} = useContext(CreateFolderContext)
    const {t} = useTranslation()

    function save() {
        createFolder()
    }

    function cancel() {
        hasFolderInCreation(false)
    }

    return(
        <div className={'create-folder-form'}>
            <input className={'create-form-input'} type={'text'} placeholder={t('placeholders.title')} onChange={e => setFolderTitle(e.currentTarget.value)}/>
            <div className={'create-folder-buttons'}>
                <button className={'create-folder-button'} onClick={save}>{t('buttons.save')}</button>
                <button className={'create-folder-button'} onClick={cancel}>{t('buttons.cancel')}</button>
            </div>
        </div>
    )
}