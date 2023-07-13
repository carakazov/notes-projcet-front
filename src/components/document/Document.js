import './document.css'
import {useContext} from "react";
import {FolderContext} from "../../conxtexts/foldercontext/folderContext";
import {CURRENT_DOCUMENT} from "../../constants/tokenConstants";
import {CurrentNoteContext} from "../../conxtexts/currentnotecontext/currentNoteContext";
import {ObjectsToDeleteContext} from "../../conxtexts/objectstodeletecontext/objectsToDeleteContext";

export default function Document(props) {
    const {document} = props
    const {addDocument, removeDocument} = useContext(FolderContext)
    const {setCurrentNote, hasInCreation} = useContext(CurrentNoteContext)
    const {hasSelected} = useContext(ObjectsToDeleteContext)
    function handleChange(e) {
        if(e.currentTarget.checked) {
            addDocument(document.externalId)
            hasSelected(true)
        } else {
            removeDocument(document.externalId)
        }
    }

    function setContent() {
        setCurrentNote(document)
        hasInCreation(false)
    }

    return(
        <div className={'document'}>
            <div className={'document-control'}>
                <input type={'checkbox'} onChange={e => handleChange(e)}/>
                <p className={'document-title'} onClick={setContent}>{document.title}</p>
            </div>
        </div>
    )
}