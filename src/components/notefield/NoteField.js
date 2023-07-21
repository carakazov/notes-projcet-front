import './notefield.css'
import {useContext, useEffect, useState} from "react";
import {CurrentNoteContext} from "../../conxtexts/currentnotecontext/currentNoteContext";
import {useTranslation} from "react-i18next";
import {isStringEmpty} from "../../validators/stringValidator";
import {addLocalNote, editLocalNote, getLocalNoteExternalId} from "../../starter/localStorageHelper";
import {createNote, noteUpdate, readNote} from "../../api/logicApi";

export default function NoteField() {
    const {currentNote, isInCreation, creationDirectory, setCurrentNote, hasInCreation, setReloadFolders, isEditInProcess, hasEditInProcess} = useContext(CurrentNoteContext)
    const [newContent, setNewContent] = useState("")
    const [newTitle, setNewTitle] = useState("")
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState({
        titleRequired: null,
        contentRequired: null
    })
    const {t} = useTranslation()

    useEffect(() => {
        if(currentNote) {
            if(currentNote?.externalId?.includes('local')) {
                setContent(currentNote.content)
            } else {
                if(currentNote?.externalId) {
                    readNote(currentNote?.externalId)
                        .then(result => {
                            setContent(result.note.content)
                        })
                        .catch(e => console.log(e))
                } else {
                    setContent(currentNote.content)
                }
            }
        } else {
            setContent(null)
        }
    }, [currentNote])

    const field = isInCreation ? getWriteMode() : getReadMode()


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
        } else {
            let note = {
                content: newContent,
                directoryExternalId: creationDirectory,
                title: newTitle
            }
            createNote(note)
                .then(result => {
                    console.log(result)
                    readNote(result.externalId)
                        .then(createdNote => {
                            hasInCreation(false)
                            createdNote.note.externalId = result.externalId
                            console.log(createdNote.note)
                            setCurrentNote(createdNote.note)
                            setReloadFolders(true)
                        })
                        .catch()
                }).catch()
        }
    }

    function edit() {
        if(validateContent()) {
            if(currentNote.externalId.includes('local-note')) {
                editLocalNote(currentNote.externalId, newContent)
                setContent(newContent)
                hasEditInProcess(false)
                hasInCreation(false)
                setReloadFolders(true)
            } else {
                let newNote = {
                    content: newContent
                }
                noteUpdate(newNote, currentNote.externalId)
                    .then(() => {
                        setContent(newContent)
                        hasEditInProcess(false)
                        hasInCreation(false)
                        setReloadFolders(true)
                    }).catch(error => console.log(error))
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
                    <textarea className={'content-input'} onChange={e => setNewContent(e.currentTarget.value)} readOnly={false} defaultValue={isEditInProcess ? content : ""}/>
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
                    <div className={'content-block'}>
                        {content}
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className={'note-field'}>
            {field}
        </div>
    )
}