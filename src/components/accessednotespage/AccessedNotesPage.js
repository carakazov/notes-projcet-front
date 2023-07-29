import './accessednotespage.css'
import NotesTab from "../notestab/NotesTab";
import {useState} from "react";
import {AccessedNotesContext} from "../../conxtexts/accessednotescontext/accessedNotesContext";
import AccessedNoteContent from "../accessednotecontent/AccessedNoteContent";

export default function AccessedNotesPage() {
    const [currentNote, setCurrentNote] = useState()
    const [isEdit, hasEdit] = useState(false)

    return(
        <div className={'accessed-notes-page'}>
            <div className={'accessed-notes-wrapper'}>
                <AccessedNotesContext.Provider value={{currentNote, setCurrentNote, isEdit, hasEdit}}>
                    <div className={'notes-tab'}>
                        <NotesTab/>
                    </div>
                    <div className={'accessed-note-wrapper'}>
                        <AccessedNoteContent/>
                    </div>
                </AccessedNotesContext.Provider>
            </div>
        </div>
    )
}