import './notefield.css'
import {useContext, useEffect, useState} from "react";
import {CurrentNoteContext} from "../../conxtexts/currentnotecontext/currentNoteContext";
import {useTranslation} from "react-i18next";
import {isStringEmpty} from "../../validators/stringValidator";
import {addLocalNote, editLocalNote, getLocalNoteExternalId} from "../../starter/localStorageHelper";

export default function NoteField() {
    const {currentNote, isInCreation, creationDirectory, setCurrentNote, hasInCreation, setReloadFolders, isEditInProcess, hasEditInProcess} = useContext(CurrentNoteContext)
    const [newContent, setNewContent] = useState("")
    const [newTitle, setNewTitle] = useState("")
    const [errors, setErrors] = useState({
        titleRequired: null,
        contentRequired: null
    })
    const {t} = useTranslation()

    const content = isInCreation ? getWriteMode() : getReadMode()


    function save() {
        if(isEditInProcess) {
            edit()
        } else {
            if(validate()) {
                create()
            }
        }
    }

    function validateContent() {
        let correct = true
        let errorObject = {}
        if(isStringEmpty(newContent)) {
            errorObject.contentRequired = t('messages.itIsRequiredField')
            correct = false
        }
        setErrors(errorObject)
        return correct
    }

    function create() {
        if(creationDirectory.includes('local')) {
            let note = {
                externalId: getLocalNoteExternalId(),
                title: newTitle,
                content: newContent
            }
            addLocalNote(note)
            hasInCreation(false)
            setCurrentNote(note)
            setReloadFolders(true)
        }
    }

    function edit() {
        if(validateContent()) {
            if(currentNote.externalId.includes('local-note')) {
                editLocalNote(currentNote.externalId, newContent)
                currentNote.content = newContent
                hasEditInProcess(false)
                hasInCreation(false)
                setReloadFolders(true)
            }
        }
    }

    function validate() {
        let correct = true
        let errorObject = {}
        if(isStringEmpty(newTitle)) {
            errorObject.titleRequired = t('messages.itIsRequiredField')
            correct = false
        }
        if(isStringEmpty(newContent)) {
            errorObject.contentRequired = t('messages.itIsRequiredField')
            correct = false
        }
        setErrors(errorObject)
        return correct
    }

    function getWriteMode() {
        return(
            <div className={'field-content'}>
                <div className={'creation-field'}>
                    <input className={'title-input'} onChange={e => setNewTitle(e.currentTarget.value)} disabled={isEditInProcess} value={isEditInProcess ? currentNote.title : null}/>
                    <p className={'required-field-message'}>{errors.titleRequired}</p>
                    <textarea className={'content-input'} onChange={e => setNewContent(e.currentTarget.value)} readOnly={false}>
                        {isEditInProcess ? currentNote.content : null}
                    </textarea>
                    <p className={'required-field-message'}>{errors.contentRequired}</p>
                    <button className={'save-button'} onClick={save}>{t("buttons.save")}</button>
                </div>
            </div>
        )
    }

    function startEdit() {
        hasEditInProcess(true)
        hasInCreation(true)
    }

    function getReadMode() {
        return(
            <div className={'read-block'}>
                <button className={'edit-button'} hidden={!currentNote} onClick={startEdit}>{t('buttons.edit')}</button>
                <div className={'field-content'}>
                    {currentNote?.content}
                </div>
            </div>
        )
    }

    return(
        <div className={'note-field'}>
            {content}
        </div>
    )
}