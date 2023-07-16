import './tabheader.css'
import TabList from "../tablist/TabList";
import {useTranslation} from "react-i18next";

export default function TabHeader() {
    const {t, i18n} = useTranslation()

    function setLanguage(language) {
        i18n.changeLanguage(language)
    }

    return(
        <div className={'tab-header'}>
            <div className={'tab-header-item'}>
                <TabList/>
            </div>
            <div className={'tab-header-item tab-header-functions'}>
                <button onClick={() => setLanguage("en")} className={'tab-header-button'}>EN</button>
                <button onClick={() => setLanguage("ru")} className={'tab-header-button'}>RU</button>
                <button className={'tab-header-button'}>{t('buttons.registration')}</button>
            </div>
        </div>
    )
}