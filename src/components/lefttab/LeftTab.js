import './lefttab.css'
import CompanyLogo from "../companylogo/CompanyLogo";
import FolderTab from "../foldertab/FolderTab";
import {ObjectsToDeleteContext} from "../../conxtexts/objectstodeletecontext/objectsToDeleteContext";
import {useState} from "react";

export default function LeftTab() {
    const [isSelected, hasSelected] = useState(false)
    const [objectToDelete, setObjectToDelete] = useState({})

    return(
        <ObjectsToDeleteContext.Provider value={{isSelected, hasSelected, objectToDelete, setObjectToDelete}}>
            <div className={'left-tab'}>
                <CompanyLogo/>
                <FolderTab/>
            </div>
        </ObjectsToDeleteContext.Provider>
    )
}