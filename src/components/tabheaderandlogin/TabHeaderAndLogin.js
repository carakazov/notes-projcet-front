import './tabheaderandlogin.css'
import TabHeader from "../tabheader/TabHeader";
import LoginForm from "../loginform/LoginForm";

export default function TabHeaderAndLogin() {
    return(
        <div className={'tab-header-and-login'}>
            <div className={'tab-header-item tab-header-block'}>
                <TabHeader/>
            </div>
            <div className={'tab-header-item login-form-block'}>
                <LoginForm/>
            </div>
        </div>
    )
}