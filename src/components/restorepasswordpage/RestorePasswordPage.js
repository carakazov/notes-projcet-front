import './restorepasswordpage.css'
import {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import {isEmail, isStringEmpty} from "../../validators/stringValidator";
import {restorePassword} from "../../api/authApi";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";

export default function RestorePasswordPage() {
    const [contact, setContact] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [isOk, hasOk] = useState(false)
    const [error, setError] = useState({})
    const {handleFatalError} = useContext(GlobalContext)

    const {t} = useTranslation()
    const navigate = useNavigate()

    function validate() {
        let errorObj = {}
        let correct = true

        if(isStringEmpty(contact)) {
            errorObj.contactRequired = t('messages.itIsRequiredField')
            correct = false
        } else if(!isEmail(contact)) {
            errorObj.notEmail = t('messages.inputCorrectEmail')
            correct = false
        }

        if(isStringEmpty(newPassword)) {
            errorObj.passwordRequired = t('messages.itIsRequiredField')
            correct = false
        } else if(newPassword.length < 5 || newPassword.length > 255) {
            errorObj.passwordWrongLength = t('messages.lengthFrom5to255')
            correct = false
        }

        setError(errorObj)
        return correct
    }

    function callRestorePassword() {
        if(validate()) {
            let body = {
                clientId: 'notes-system',
                contact: contact,
                newPassword: newPassword
            }
            restorePassword(body)
                .then(() => hasOk(true))
                .catch(() => handleFatalError())
        }
    }

    const emptyContact = error.contactRequired ? <p className={'error-message'}>{error.contactRequired}</p> : null
    const notEmail = error.notEmail ? <p className={'error-message'}>{error.notEmail}</p> : null

    const emptyNewPassword = error.passwordRequired ? <p className={'error-message'}>{error.passwordRequired}</p> : null
    const passwordWrongLength = error.passwordWrongLength ? <p className={'error-message'}>{error.passwordWrongLength}</p> : null

    const okBlock = isOk ? <h1>{t('labels.checkEmail')}</h1> : null

    return(
        <div className={'restore-password-page'}>
            <div className={'restore-password-wrapper'}>
                <div className={'restore-password'}>
                    <div className={'restore-password-labels'}>
                        <label className={'restore-password-label'}>{t('labels.email')}</label>
                        <label className={'restore-password-label'}>{t('labels.newPassword')}</label>
                    </div>
                    <div className={'restore-password-inputs'}>
                        <div className={'restore-password-input-block'}>
                            <input className={'restore-password-input'} onChange={e => setContact(e.currentTarget.value)}/>
                            {emptyContact}
                            {notEmail}
                        </div>
                        <div className={'restore-password-input-block'}>
                            <input className={'restore-password-input'} onChange={e => setNewPassword(e.currentTarget.value)}/>
                            {emptyNewPassword}
                            {passwordWrongLength}
                        </div>
                    </div>
                </div>
                <div className={'restore-password-button'}>
                    <button onClick={callRestorePassword} className={'to-main-button restore-button'}>{t('buttons.restorePassword')}</button>
                    <button onClick={() => navigate("/")} className={'to-main-button'}>{t('buttons.toMain')}</button>
                </div>
            </div>
            <div className={'ok-block'}>
                {okBlock}
            </div>
        </div>
    )
}