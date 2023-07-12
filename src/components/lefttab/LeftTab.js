import './lefttab.css'
import CompanyLogo from "../companylogo/CompanyLogo";
import FolderTab from "../foldertab/FolderTab";

export default function LeftTab() {
    return(
        <div className={'left-tab'}>
            <CompanyLogo/>
            <FolderTab/>
        </div>
    )
}