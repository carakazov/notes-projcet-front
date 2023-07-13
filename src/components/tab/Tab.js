import './tab.css'
import {useContext} from "react";
import {CurrentNoteContext} from "../../conxtexts/currentnotecontext/currentNoteContext";

export default function Tab(props) {
    const {setCurrentNote} = useContext(CurrentNoteContext)
    const {note} = props

    return(
        <div className={'tab'} onClick={() => setCurrentNote(note)}>
            {note.title}
        </div>
    )
}