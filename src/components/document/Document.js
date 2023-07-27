import './document.css'
import {useContext} from "react";
import {FolderContext} from "../../conxtexts/foldercontext/folderContext";
import {CURRENT_DOCUMENT} from "../../constants/tokenConstants";
import {CurrentNoteContext} from "../../conxtexts/currentnotecontext/currentNoteContext";
import {ObjectsToDeleteContext} from "../../conxtexts/objectstodeletecontext/objectsToDeleteContext";
import {useTranslation} from "react-i18next";

export default function Document(props) {
    const {document, folderExternalId} = props
    const {addDocument, removeDocument, setModalActive, setMovingDocument} = useContext(FolderContext)
    const {setCurrentNote, hasInCreation} = useContext(CurrentNoteContext)
    const {hasSelected} = useContext(ObjectsToDeleteContext)
    const {t} = useTranslation()
    function handleChange(e) {
        if(e.currentTarget.checked) {
            addDocument(document.externalId, folderExternalId)
            hasSelected(true)
        } else {
            removeDocument(document.externalId)
        }
    }

    function setContent() {
        setCurrentNote(document)
        hasInCreation(false)
    }

    function moveDocument() {
        setModalActive(true)
        setMovingDocument(document)
    }

    const moveButton = folderExternalId.includes('local') ? null : <div className={'document-control-item'}>
        <p onClick={moveDocument} className={'move'}>{t('labels.move')}</p>
    </div>

    return(
        <div className={'document'}>
            <div className={'document-control'}>
                <div className={'document-control-item title-block'}>
                    <input type={'checkbox'} onChange={e => handleChange(e)}/>
                    <p className={'document-title'} onClick={setContent}>{document.title}</p>
                </div>
                {moveButton}
            </div>
        </div>
    )
}