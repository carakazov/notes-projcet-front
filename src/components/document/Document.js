import './document.css'
import {useContext} from "react";
import {FolderContext} from "../foldercontext/folderContext";

export default function Document(props) {
    const {document} = props
    const {addDocument, removeDocument} = useContext(FolderContext)

    function handleChange(e) {
        if(e.currentTarget.checked) {
            addDocument(document.externalId)
        } else {
            removeDocument(document.externalId)
        }
    }

    return(
        <div className={'document'}>
            <div className={'document-control'}>
                <input type={'checkbox'} onChange={e => handleChange(e)}/>
                <p className={'document-title'}>{document.title}</p>
            </div>
        </div>
    )
}