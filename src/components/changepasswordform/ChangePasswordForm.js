import './changepasswordform.css'
import {useContext, useState} from "react";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";
import {useTranslation} from "react-i18next";
import {isStringEmpty} from "../../validators/stringValidator";
import {changePassword} from "../../api/logicApi";
import {useActionData} from "react-router";

export default function ChangePasswordForm(props) {
    const {cancelFunction} = props
    const {handleFatalError} = useContext(GlobalContext)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [error, setError] = useState({})
    const [dataError, setDataError] = useState(false)
    const {t} = useTranslation()

    function validate() {
        let correct = true
        let errorObj = {}
        if(isStringEmpty(oldPassword)) {
            correct = false
            errorObj.oldPasswordRequired = t('messages.itIsRequiredField')
        }
        if(oldPassword.length < 5) {
            correct = false
            errorObj.oldPasswordRequired = t('messages.lengthFrom5to255')
        }
        if(isStringEmpty(newPassword)) {
            correct = false
            errorObj.newPasswordRequired = t('messages.itIsRequiredField')
        }
        if(newPassword.length < 5) {
            correct = false
            errorObj.newPasswordRequired = t('messages.lengthFrom5to255')
        }
        setError(errorObj)
        return correct
    }

    function callChangePassword() {
        if(validate()) {
            const request = {
                newPassword: newPassword,
                oldPassword: oldPassword
            }
            changePassword(request)
                .then(() => cancelFunction())
                .catch(status => {
                    if(status === 500) {
                        handleFatalError()
                    } else {
                        setDataError(true)
                    }
                })
        }
    }

    const errorMessage = dataError ? <p className={'error-change-password-message'}>{t('labels.checkInputData')}</p> : null

    const oldPasswordRequired = error.oldPasswordRequired ? <p className={'error-message'}>{error.oldPasswordRequired}</p> : null
    const newPasswordRequired = error.newPasswordRequired ? <p className={'error-message'}>{error.newPasswordRequired}</p> : null
    return(
        <div className={'change-password-wrapper'}>
            <div className={'change-password-info'}>
                <div className={'change-password-labels'}>
                    <label className={'change-password-label'}>{t('labels.oldPassword')}</label>
                    <label className={'change-password-label'}>{t('labels.newPassword')}</label>
                </div>
                <div className={'change-password-inputs'}>
                    <div className={'change-password-input-block'}>
                        <input type={'text'} className={'change-password-input'} onChange={e => setOldPassword(e.currentTarget.value)}/>
                        {oldPasswordRequired}
                    </div>
                    <div className={'change-password-input-block'}>
                        <input type={'text'} className={'change-password-input'} onChange={e => setNewPassword(e.currentTarget.value)}/>
                        {newPasswordRequired}
                    </div>
                </div>
            </div>
            <div className={'change-password-buttons'}>
                <button onClick={callChangePassword} className={'to-main-button'}>{t('buttons.save')}</button>
                <button onClick={() => cancelFunction()} className={'to-main-button'}>{t('buttons.cancel')}</button>
            </div>
            {errorMessage}
        </div>
    )
}