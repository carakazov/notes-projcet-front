import './righttab.css'
import TabHeaderAndLogin from "../tabheaderandlogin/TabHeaderAndLogin";
import NoteField from "../notefield/NoteField";

export default function RightTab() {
    return(
        <div className={'right-tab'}>
            <TabHeaderAndLogin/>
            <NoteField/>
        </div>
    )
}