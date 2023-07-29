import './notestab.css'
import {useContext, useEffect, useState} from "react";
import {getMyAccessedNotes} from "../../api/logicApi";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";
import AccessedDocument from "../accesseddocument/AccessedDocument";

export default function NotesTab() {
    const [notes, setNotes] = useState([])
    const {handleFatalError} = useContext(GlobalContext)

    useEffect(() => {
        getMyAccessedNotes()
            .then(result => setNotes(result.notes))
            .catch(handleFatalError)
    }, [])

    return(
        <div className={'notes-wrapper'}>
            {notes.map(item => <AccessedDocument note={item}/>)}
        </div>
    )
}