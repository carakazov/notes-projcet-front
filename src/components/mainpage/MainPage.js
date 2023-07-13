import './mainpage.css'
import LeftTab from "../lefttab/LeftTab";
import TabHeaderAndLogin from "../tabheaderandlogin/TabHeaderAndLogin";
import RightTab from "../righttab/RightTab";
import {CurrentNoteContext} from "../../conxtexts/currentnotecontext/currentNoteContext";
import {useEffect, useState} from "react";
import {LOCAL_FOLDER} from "../../constants/tokenConstants";

export default function MainPage() {
    const [currentNote, setCurrentNote] = useState()
    const [isInCreation, hasInCreation] = useState(false)
    const [creationDirectory, setCreationDirectory] = useState(false)
    const [folders, setFolders] = useState([])
    const [reloadFolders, setReloadFolders] = useState(true)
    const [isEditInProcess, hasEditInProcess] = useState(false)

    useEffect(() => {
        if(reloadFolders) {
            let folder = JSON.parse(localStorage.getItem(LOCAL_FOLDER))
            let arr = []
            arr.push(folder)
            setFolders(arr)
            setReloadFolders(false)
        }
    }, [reloadFolders])

    return(
        <CurrentNoteContext.Provider value={{currentNote, setCurrentNote, isInCreation, hasInCreation, creationDirectory, setCreationDirectory, folders, setReloadFolders, isEditInProcess, hasEditInProcess}}>
            <div className={'main-page'}>
                <div className={'main-page-item left-tab-item'}>
                    <LeftTab/>
                </div>
                <div className={'main-page-item right-tab-item'}>
                    <RightTab/>
                </div>
            </div>
        </CurrentNoteContext.Provider>
    )
}