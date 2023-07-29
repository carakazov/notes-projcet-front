import './accessednotecontent.css'
import {Fragment, useContext, useEffect, useState} from "react";
import {AccessedNotesContext} from "../../conxtexts/accessednotescontext/accessedNotesContext";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import {isStringEmpty} from "../../validators/stringValidator";
import {noteUpdate} from "../../api/logicApi";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";

export default function AccessedNoteContent() {
    const {handleFatalError} = useContext(GlobalContext)
    const {currentNote, isEdit, hasEdit} = useContext(AccessedNotesContext)
    const [currentContent, setCurrentContent] = useState("")
    const [newContent, setNewContent] = useState("")
    const [error, setError] = useState()
    const {t} = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        setCurrentContent(currentNote?.note?.content)
    }, [currentNote])

    const edit = currentNote?.accessMode === 'READ_WRITE' ?
        <button onClick={() => hasEdit(true)} className={'to-main-button'}>{t('buttons.edit')}</button> :
        null

    function update() {
        if(isStringEmpty(newContent)) {
            setError(t('messages.itIsRequiredField'))
        } else if(newContent.length > 3000) {
            setError(t('messages.lessThan3000Symbols'))
        } else {
            const request = {
                content: newContent
            }
            noteUpdate(request, currentNote.note.externalId)
                .then(() => {
                    hasEdit(false)
                    setCurrentContent(newContent)
                })
                .catch(() => handleFatalError())
        }
    }

    function getReadBlock() {
        return(
            <div className={'accessed-note-content'}>
                <pre>
                    {currentContent}
                </pre>
            </div>
        )
    }

    function getWriteBlock() {
        return(
            <Fragment>
                <textarea className={'current-note-textarea'} onChange={e => setNewContent(e.currentTarget.value)}>
                    {currentContent}
                </textarea>
                {error ? <p className={'error-message'}>{error}</p> : null}
            </Fragment>
        )
    }

    const content = isEdit ? getWriteBlock() : getReadBlock()
    const save = <button onClick={update} className={'to-main-button'}>{t('buttons.save')}</button>

    return(
        <div className={'current-note-content-wrapper'}>
            <div className={'current-note-buttons-wrapper'}>
                <button onClick={() => navigate("/")} className={'to-main-button'}>{t('buttons.toMain')}</button>
                {isEdit ? save : edit}
            </div>
            <div className={'current-note-textarea-wrapper'}>
                <div className={'accessed-note-content'}>
                    {content}
                </div>
            </div>
        </div>
    )
}