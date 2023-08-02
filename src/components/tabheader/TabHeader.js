import './tabheader.css'
import TabList from "../tablist/TabList";
import {useTranslation} from "react-i18next";
import {Fragment, useContext} from "react";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";
import {useNavigate} from "react-router";
import {ACCESSED_NOTES_PATH, LIST_PAGE_PATH, REGISTER_PAGE_PATH, RESTORE_PASSWORD} from "../../constants/pathConstants";

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

    function getRegistrationButton() {
        return <button onClick={register} className={'tab-header-button'}>{t('buttons.registration')}</button>
    }

    function homePage() {
        navigate(`/user/${userData.externalId}`)
    }

    function list() {
        navigate(LIST_PAGE_PATH)
    }

    function toAccessedNotes() {
        navigate(ACCESSED_NOTES_PATH)
    }

    function toRestorePassword() {
        navigate(RESTORE_PASSWORD)
    }

    function getHomePageButton() {
        return (
            <Fragment>
                <button onClick={homePage} className={'tab-header-button'}>{t('buttons.homePage')}</button>
                <button onClick={list} className={'tab-header-button'}>{t('buttons.toList')}</button>
                <button onClick={toAccessedNotes} className={'tab-header-button'}>{t('buttons.toAccessedNotes')}</button>
            </Fragment>
        )
    }

    function getRestorePasswordButton() {
        return <button onClick={toRestorePassword} className={'tab-header-button'}>{t('buttons.restorePassword')}</button>
    }

    let registerButton = userData ? getHomePageButton() :getRegistrationButton()
    let restorePasswordButton = userData ? null : getRestorePasswordButton()

    return(
        <div className={'tab-header'}>
            <div className={'tab-header-item'}>
                <TabList/>
            </div>
            <div className={'tab-header-item tab-header-functions'}>
                <button onClick={() => setLanguage("en")} className={'tab-header-button'}>EN</button>
                <button onClick={() => setLanguage("ru")} className={'tab-header-button'}>RU</button>
                {restorePasswordButton}
                {registerButton}
            </div>
        </div>
    )
}