import './mainpage.css'
import LeftTab from "../lefttab/LeftTab";
import TabHeaderAndLogin from "../tabheaderandlogin/TabHeaderAndLogin";
import RightTab from "../righttab/RightTab";
import {CurrentNoteContext} from "../../conxtexts/currentnotecontext/currentNoteContext";
import {useContext, useEffect, useState} from "react";
import {LOCAL_FOLDER} from "../../constants/tokenConstants";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";
import {getClientFolders} from "../../api/logicApi";

export default function MainPage() {
    const [currentNote, setCurrentNote] = useState()
    const [isInCreation, hasInCreation] = useState(false)
    const [creationDirectory, setCreationDirectory] = useState(false)
    const [folders, setFolders] = useState([])
    const [reloadFolders, setReloadFolders] = useState(true)
    const [isEditInProcess, hasEditInProcess] = useState(false)
    const [tabToHide, setTabToHide] = useState(undefined)
    const [reloadOnlyFolderTab, setReloadOnlyFolderTab] = useState(false)
    const [folderIdToReload, setFolderIdToReload] = useState()
    const [isCloseAllTabs, hasCloseAllTabs] = useState(false)
    const {userData} = useContext(GlobalContext)

    useEffect(() => {
        if(reloadFolders || reloadOnlyFolderTab) {
            let folder = JSON.parse(localStorage.getItem(LOCAL_FOLDER))
            let arr = []
            arr.push(folder)
            if(userData) {
                getClientFolders().then(cluster => {
                    if(cluster.directories.length > 0) {
                        cluster.directories.forEach(item => arr.push(item))
                    }
                    setFolders(arr)
                    setReloadFolders(false)
                }).catch(error => {
                    setReloadFolders(false)
                })
            } else {
                setFolders(arr)
                setReloadFolders(false)
            }
            if(reloadOnlyFolderTab) {
                setReloadOnlyFolderTab(false)
            }
        }
    }, [reloadFolders, reloadOnlyFolderTab])


    return(
        <CurrentNoteContext.Provider value={{currentNote, setCurrentNote, isInCreation, hasInCreation, creationDirectory, setCreationDirectory, folders, reloadFolders, setReloadFolders, isEditInProcess, hasEditInProcess, tabToHide, setTabToHide, reloadOnlyFolderTab, setReloadOnlyFolderTab, folderIdToReload, setFolderIdToReload, isCloseAllTabs, hasCloseAllTabs}}>
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