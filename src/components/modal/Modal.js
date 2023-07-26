import './modal.css'
import {useContext, useEffect, useState} from "react";
import {FolderContext} from "../../conxtexts/foldercontext/folderContext";
import {useTranslation} from "react-i18next";
import {getClientFolders, moveNote} from "../../api/logicApi";
import {CurrentNoteContext} from "../../conxtexts/currentnotecontext/currentNoteContext";

export default function Modal(props) {
    const {active, setActive} = props
    const {movingDocument} = useContext(FolderContext)
    const {setReloadFolders} = useContext(CurrentNoteContext)
    const [foldersToInput, setFoldersToInput] = useState([])
    const [newFolderExternalId, setNewFolderExternalId] = useState("")
    const {t} = useTranslation()

    useEffect(() => {
        if(movingDocument) {
            getClientFolders()
                .then(result => {
                    setFoldersToInput(result.directories)
                    setNewFolderExternalId(result.directories.at(0).externalId)
                })
                .catch(error => console.log(error))
        }
    }, [movingDocument])

    function move() {
        let moveNoteRequest = {
            createdNoteExternalId: movingDocument.externalId,
            newDirectoryExternalId: newFolderExternalId
        }
        moveNote(moveNoteRequest)
            .then(result => {
                setActive(false)
                setReloadFolders(true)
            })
            .catch(error => console.log(error))
    }

    return(
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={'modal-content'} onClick={e => e.stopPropagation()}>
                <div className={'move-folder-block'}>
                    <div className={'moving-block-input'}>
                        <div className={'moving-block-input-item current-note-block'}>
                            <p>{t('labels.currentNote')}: {movingDocument?.title}</p>
                        </div>
                        <div className={'moving-block-input-item new-folder-block'}>
                            <p>{t('labels.folder')}</p>
                            <select className={'select-block'} onChange={e => setNewFolderExternalId(e.target.value)}>
                                {foldersToInput.map(item => <option value={item?.externalId}>{item?.title}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <button onClick={move} className={'move-block'}>{t('buttons.save')}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}