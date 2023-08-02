import './loginform.css'
import {useContext, useState} from "react";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";
import {useTranslation} from "react-i18next";
import {isStringEmpty} from "../../validators/stringValidator";
import {login} from "../../api/authApi"
import {deleteToken, setData} from "../../token/holder/tokenHolder";
import {getPersonalData} from "../../api/logicApi";
import {CURRENT_USER_DATA} from "../../constants/tokenConstants";
import {CurrentNoteContext} from "../../conxtexts/currentnotecontext/currentNoteContext";

export default function LoginForm() {
    const {t} = useTranslation()
    const {userData, setUserData} = useContext(GlobalContext)
    const {setReloadFolders, setCurrentNote, hasCloseAllTabs} = useContext(CurrentNoteContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})

    function validateForm() {
        let correct = true
        let errorObjects = {}
        if(isStringEmpty(username)) {
            errorObjects.loginFailed = t('messages.itIsRequiredField')
            correct = false
        }
        if(isStringEmpty(password)) {
            errorObjects.passwordFailed = t('messages.itIsRequiredField')
            correct = false
        }
        setErrors(errorObjects)
        return correct
    }

    function proceedLogin() {
        if(validateForm()) {
            let loginData = {
                username,
                password
            }
            login(loginData)
                .then(result => {
                    setData(username, password, result)
                    let externalId = result.externalId
                    getPersonalData(externalId)
                        .then(result => {
                            sessionStorage.setItem(CURRENT_USER_DATA, JSON.stringify(result))
                            setUserData(result)
                            setReloadFolders(true)
                        })
                        .catch(status => setErrors(formErrorObject(status)))
                })
                .catch(status => setErrors(formErrorObject(status)))
        }
    }

    function logOut() {
        deleteToken()
        sessionStorage.removeItem(CURRENT_USER_DATA)
        setUserData(null)
        setReloadFolders(true)
        setCurrentNote(null)
        hasCloseAllTabs(true)
    }

    function formErrorObject(status) {
        let errorObject = {}
        if(status === 401 || status === 400 || status === 403) {
            errorObject.serverError = t('errors.auth')
        } else {
            errorObject.serverError = t('errors.server')
        }
        return errorObject
    }

    if(userData !== null) {
        return(
            <div className={'auth-success'}>
                <p className={'auth-success-item'}>{userData.surname} {userData.name}</p>
                <div className={'logout-button-wrapper auth-success-item'}>
                    <button className={'logout-button'} onClick={logOut}>{t("buttons.logout")}</button>
                </div>
            </div>
        )
    }

    let errorBlock = errors.serverError ? <div className={'server-error-block'}>{errors.serverError}</div> : null
    let loginRequired = errors.loginFailed ? <p className={'required-field-message'}>{errors.loginFailed}</p> : null
    let passwordRequired = errors.passwordFailed ? <p className={'required-field-message'}>{errors.passwordFailed}</p> : null

    return(
        <div className={'login-form'}>
            <div className={'login-form-header'}>
                <div className={'header-label header-item'}>
                    <p>{t('labels.userNotAuthorized')}</p>
                </div>
                <div className={'header-button header-item'}>
                    <button className={'login-button'} onClick={proceedLogin}>{t('buttons.login')}</button>
                </div>
            </div>
            <div className={'input-forms'}>
                <div className={'labels'}>
                    <label className={'login-block-item'}>{t('labels.login')}</label>
                    <label className={'password-block-item'}>{t('labels.password')}</label>
                </div>
                <div className={'inputs'}>
                    <div className={'login-input-block'}>
                        <input className={'login-block-item input-field'} type={'text'} onChange={e => setUsername(e.currentTarget.value)}/>
                        {loginRequired}
                    </div>
                    <div className={'login-input-block'}>
                        <input className={'password-block-item input-field'} type={'password'} onChange={e => setPassword(e.currentTarget.value)}/>
                        {passwordRequired}
                    </div>
                </div>
            </div>
            {errorBlock}
        </div>
    )
}