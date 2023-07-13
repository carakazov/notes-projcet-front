import './folder.css'
import {useContext, useState} from "react";
import Document from "../document/Document";
import {useTranslation} from "react-i18next";
import {FolderContext} from "../../conxtexts/foldercontext/folderContext";
import {CurrentNoteContext} from "../../conxtexts/currentnotecontext/currentNoteContext";
import {ObjectsToDeleteContext} from "../../conxtexts/objectstodeletecontext/objectsToDeleteContext";

export default function Folder(props) {
    const {t} = useTranslation()
    const [isOpen, hasOpen] = useState(false)
    const {folder} = props
    const {addFolder, removeFolder} = useContext(FolderContext)
    const {setCreationDirectory, hasInCreation, hasEditInProcess} = useContext(CurrentNoteContext)
    const {hasSelected} = useContext(ObjectsToDeleteContext)
    let arrowClassName = isOpen ? "arrow open" : "arrow"

    function handleCheck(e) {
        if(e.currentTarget.checked) {
            addFolder(folder.externalId)
            hasSelected(true)
        } else {
            removeFolder(folder.externalId)
        }
    }

    function create() {
        setCreationDirectory(folder.externalId)
        hasInCreation(true)
        hasEditInProcess(false)
    }

    function open() {
        hasOpen(!isOpen)
    }

    let documents = isOpen ?
        <div className={'documents-block'}>
            {folder?.notes.map(item => <Document document={item} key={item.externalId}/>)}
            <p className={'create-note'} onClick={create}>{t("labels.createNote")}</p>
        </div> :
        null

    let arrow = <span className={arrowClassName} onClick={open}>&#10151;</span>

    return(
        <div className={'folder'}>
            <div className={'folder-controls'}>
                <input type={'checkbox'} className={'folder-check-box'} onChange={e => handleCheck(e)}/>
                <div className={'arrow-wrapper'}>
                    {arrow}
                </div>
                <p>{folder?.title}</p>
            </div>
            {documents}
        </div>
    )
}