import './mainpage.css'
import LeftTab from "../lefttab/LeftTab";
import TabHeaderAndLogin from "../tabheaderandlogin/TabHeaderAndLogin";

export default function MainPage() {
    return(
        <div className={'main-page'}>
            <div className={'main-page-item left-tab-item'}>
                <LeftTab/>
            </div>
            <div className={'main-page-item right-tab-item'}>
                <TabHeaderAndLogin/>
            </div>
        </div>
    )
}