import './tabheader.css'
import TabList from "../tablist/TabList";
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";
import {useNavigate} from "react-router";
import {REGISTER_PAGE_PATH} from "../../constants/pathConstants";

export default function TabHeader() {
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()
    const {userData} = useContext(GlobalContext)

    function setLanguage(language) {
        i18n.changeLanguage(language)
    }

    function register() {
        navigate(REGISTER_PAGE_PATH)
    }

    let registerButton = userData ? null : <button onClick={register} className={'tab-header-button'}>{t('buttons.registration')}</button>

    return(
        <div className={'tab-header'}>
            <div className={'tab-header-item'}>
                <TabList/>
            </div>
            <div className={'tab-header-item tab-header-functions'}>
                <button onClick={() => setLanguage("en")} className={'tab-header-button'}>EN</button>
                <button onClick={() => setLanguage("ru")} className={'tab-header-button'}>RU</button>
                {registerButton}
            </div>
        </div>
    )
}