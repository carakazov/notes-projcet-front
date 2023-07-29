import './accesseddocument.css'
import {useContext} from "react";
import {AccessedNotesContext} from "../../conxtexts/accessednotescontext/accessedNotesContext";

export default function AccessedDocument(props) {
    const {note} = props
    const {setCurrentNote, hasEdit} = useContext(AccessedNotesContext)

    return(
        <div onClick={() => {
            setCurrentNote(note)
            hasEdit(false)
        }} className={'accessed-document-wrapper'}>
            <p className={'accessed-document-title'}>{note.note.title}</p>
        </div>
    )
}