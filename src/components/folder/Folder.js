import './folder.css'
import {useContext, useState} from "react";
import Document from "../document/Document";
import {useTranslation} from "react-i18next";
import {FolderContext} from "../foldercontext/folderContext";

export default function Folder(props) {
    const {t} = useTranslation()
    const [isOpen, hasOpen] = useState(false)
    const {folder} = props
    const {addFolder, removeFolder} = useContext(FolderContext)

    let arrowClassName = isOpen ? "arrow open" : "arrow"

    function handleCheck(e) {
        if(e.currentTarget.checked) {
            addFolder(folder.externalId)
        } else {
            removeFolder(folder.externalId)
        }
    }

    function open() {
        hasOpen(!isOpen)
    }

    let documents = isOpen ?
        <div className={'documents-block'}>
            {folder?.notes.map(item => <Document document={item}/>)}
            <p className={'create-note'}>{t("labels.createNote")}</p>
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