import './loginform.css'
import {useContext, useState} from "react";
import {AuthContext} from "../../conxtexts/authcontext/authContext";
import {useTranslation} from "react-i18next";
import {isStringEmpty} from "../../validators/stringValidator";
import {login} from "../../api/authApi"
import {setData} from "../../token/holder/tokenHolder";
import {getPersonalData} from "../../api/logicApi";

export default function LoginForm() {
    const {t} = useTranslation()
    const {userData, setUserData} = useContext(AuthContext)

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
                        .then(result => setUserData(result))
                        .catch(status => {
                            let errorObject = {}
                            errorObject.serverError = t("errors.auth")
                            setErrors(errorObject)
                        })
                })
                .catch(status => {
                    let errorObject = {}
                    if(status === 401) {
                        errorObject.serverError = t("errors.auth")
                    }
                    setErrors(errorObject)
                })
        }
    }

    if(userData !== null) {
        alert(userData.name)
        return(
            <div>Вы авторизованы</div>
        )
    }

    let errorBlock = errors.serverError ? <div className={'server-error-block'}>{errors.serverError}</div> : null
    let loginRequired = errors.loginFailed ? <p>{errors.loginFailed}</p> : null
    let passwordRequired = errors.passwordFailed ? <p>{errors.passwordFailed}</p> : null

    return(
        <div className={'login-form'}>
            <div className={'login-form-header'}>
                <p>{t('labels.userNotAuthorized')}</p>
                <button onClick={proceedLogin}>{t('buttons.login')}</button>
            </div>
            <div className={'input-forms'}>
                <div className={'login-block'}>
                    <label className={'login-block-item'}>{t('labels.login')}</label>
                    <input className={'login-block-item'} type={'text'} onChange={e => setUsername(e.currentTarget.value)}/>
                    {loginRequired}
                </div>
                <div className={'password-block'}>
                    <label className={'password-block-item'}>{t('labels.password')}</label>
                    <input className={'password-block-item'} type={'password'} onChange={e => setPassword(e.currentTarget.value)}/>
                    {passwordRequired}
                </div>
                {errorBlock}
            </div>
        </div>
    )
}