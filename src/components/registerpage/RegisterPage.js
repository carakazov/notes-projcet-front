import './registerpage.css'
import {useTranslation} from "react-i18next";
import {useContext, useState} from "react";
import {isEmail, isStringEmpty} from "../../validators/stringValidator";
import {useNavigate} from "react-router";
import {registerClient} from "../../api/authApi";
import {getPersonalData} from "../../api/logicApi";
import {
    ACCESS_TOKEN_EXPIRATION_TIME_KEY,
    CURRENT_USER_DATA,
    LOGIN_KEY,
    PASSWORD_KEY
} from "../../constants/tokenConstants";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";


export default function RegisterPage() {
    const {t} = useTranslation()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [email, setEmail] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const [favoriteBook, setFavoriteBook] = useState("")
    const [favoriteFilm, setFavoriteFilm] = useState("")
    const [error, setError] = useState({})
    const navigate = useNavigate()
    const {setUserData, handleFatalError} = useContext(GlobalContext)
    const [serverError, setServerError] = useState()

    function validate() {
        let correct = true
        let errorObject = {}
        if(isStringEmpty(username)) {
            correct = false
            errorObject.loginRequired = t('messages.itIsRequiredField')
        } else if(username.length < 5 || username.length > 255){
            correct = false
            errorObject.loginWrongLength = t('messages.lengthFrom5to255')
        }
        if(isStringEmpty(password)) {
            correct = false
            errorObject.passwordRequired = t('messages.itIsRequiredField')
        } else if((password.length > 0) && password.length < 5 || password.length > 255) {
            correct = false
            errorObject.passwordWrongLength = t('messages.lengthFrom5to255')
        }
        if(isStringEmpty(name)) {
            correct = false
            errorObject.nameRequired = t('messages.itIsRequiredField')
        }
        if(isStringEmpty(surname)) {
            correct = false
            errorObject.surnameRequired = t('messages.itIsRequiredField')
        }
        if(dateOfBirth === null) {
            correct = false
            errorObject.dobRequired = t('messages.itIsRequiredField')
        }
        if(new Date() < Date.parse(dateOfBirth)) {
            correct = false
            errorObject.pickCorrectDate = t('messages.pickCorrectDate')
        }
        if(isStringEmpty(email)) {
            correct = false
            errorObject.emailRequired = t('messages.itIsRequiredField')
        } else {
            if(!isEmail(email)) {
                correct = false
                errorObject.notEmail = t('messages.inputCorrectEmail')
            }
        }
        setError(errorObject)
        return correct
    }

    function register() {
        if(validate()) {
            const request = {
                authInformation: {
                    clientId: 'notes-system',
                    username: username,
                    password: password,
                    serviceClientRoles: [
                        'ROLE_USER'
                    ]
                },
                additionalInformation: {
                    name: name,
                    surname: surname,
                    middleName: middleName,
                    email: email,
                    dateOfBirth: dateOfBirth,
                    additionalInfo: []
                }
            }

            if(favoriteFilm) {
                request.additionalInformation.additionalInfo.push({
                    field: 'favoriteBook',
                    value: favoriteBook
                })
            }

            if(favoriteBook) {
                request.additionalInformation.additionalInfo.push({
                    field: 'favoriteFilm',
                    value: favoriteFilm
                })
            }

            registerClient(request)
                .then(result => {
                    sessionStorage.setItem(LOGIN_KEY, username)
                    sessionStorage.setItem(PASSWORD_KEY, password)
                    sessionStorage.setItem(ACCESS_TOKEN_EXPIRATION_TIME_KEY, Math.round(new Date().getTime()/1000)-100)
                    getPersonalData(result.clientExternalId)
                        .then(data => {
                            sessionStorage.setItem(CURRENT_USER_DATA, JSON.stringify(data))
                            setUserData(data)
                            navigate("/")
                        })
                        .catch(() => handleFatalError())
                })
                .catch(error => {
                    console.log(error)
                    if(error === 400) {
                        setServerError(t('messages.loginTaken'))
                    } else {
                        handleFatalError()
                    }
                })
        }
    }

    const usernameError = error.loginRequired ? <p className={'error-message'}>{error.loginRequired}</p> : null
    const usernameWrongLength = error.loginWrongLength ? <p className={'error-message'}>{error.loginWrongLength}</p> : null
    const passwordError = error.passwordRequired ? <p className={'error-message'}>{error.passwordRequired}</p> : null
    const passwordWrongLength = error.passwordWrongLength ? <p className={'error-message'}>{error.passwordWrongLength}</p> : null
    const nameError = error.nameRequired ? <p className={'error-message'}>{error.nameRequired}</p> : null
    const surnameError = error.surnameRequired ? <p className={'error-message'}>{error.surnameRequired}</p> : null
    const dobError = error.dobRequired ? <p className={'error-message'}>{error.dobRequired}</p> : null
    const dobFuture = error.pickCorrectDate ? <p className={'error-message'}>{error.pickCorrectDate}</p> : null
    const emailRequired = error.emailRequired ? <p className={'error-message'}>{error.emailRequired}</p> : null
    const emailRegex = error.notEmail ? <p className={'error-message'}>{error.notEmail}</p> : null
    const loginAlreadyTaken = serverError ? <p className={'error-message'}>{serverError}</p> : null

    return(
        <div className={'registration-page'}>
            <h1>.BSC Pricols</h1>
            <div className={'registration-form-wrapper'}>
                <div className={'registration-form'}>
                    <div className={'registration-labels-block'}>
                        <label className={'registration-label'}>{t('labels.login')}</label>
                        <label className={'registration-label'}>{t('labels.password')}</label>
                        <label className={'registration-label'}>{t('labels.name')}</label>
                        <label className={'registration-label'}>{t('labels.surname')}</label>
                        <label className={'registration-label'}>{t('labels.middleName')}</label>
                        <label className={'registration-label'}>{t('labels.email')}</label>
                        <label className={'registration-label'}>{t('labels.dateOfBirth')}</label>
                    </div>
                    <div className={'registration-inputs-block'}>
                        <div className={'input-block'}>
                            <input className={'registration-input'} type={'text'} onChange={e => setUsername(e.currentTarget.value)}/>
                            {usernameError}
                            {usernameWrongLength}
                            {loginAlreadyTaken}
                        </div>
                        <div className={'input-block'}>
                            <input className={'registration-input'} type={'password'} onChange={e => setPassword(e.currentTarget.value)}/>
                            {passwordError}
                            {passwordWrongLength}
                        </div>
                        <div className={'input-block'}>
                            <input className={'registration-input'} type={'text'} onChange={e => setName(e.currentTarget.value)}/>
                            {nameError}
                        </div>
                        <div className={'input-block'}>
                            <input className={'registration-input'} type={'text'} onChange={e => setSurname(e.currentTarget.value)}/>
                            {surnameError}
                        </div>
                        <div className={'input-block'}>
                            <input className={'registration-input'} type={'text'} onChange={e => setMiddleName(e.currentTarget.value)}/>
                        </div>
                        <div className={'input-block'}>
                            <input className={'registration-input'} type={'text'} onChange={e => setEmail(e.currentTarget.value)}/>
                            {emailRegex}
                            {emailRequired}
                        </div>
                        <div className={'input-block'}>
                            <input className={'registration-input'} type={'date'} onChange={e => setDateOfBirth(e.currentTarget.value)}/>
                            {dobError}
                            {dobFuture}
                        </div>
                    </div>
                </div>
                <div className={'additional-info'}>
                    <p>{t('labels.aboutYourself')}</p>
                    <div className={'additional-info-block'}>
                        <div className={'additional-info-labels'}>
                            <label className={'registration-label'}>{t('labels.favoriteBook')}</label>
                            <label className={'registration-label'}>{t('labels.favoriteFilm')}</label>
                        </div>
                        <div className={'additional-info-inputs'}>
                            <input className={'registration-input'} type={'text'} onChange={e => setFavoriteBook(e.currentTarget.value)}/>
                            <input className={'registration-input'} type={'text'} onChange={e => setFavoriteFilm(e.currentTarget.value)}/>
                        </div>
                    </div>
                </div>
                <div className={'registration-form-buttons'}>
                    <button onClick={register} className={'registration-button'}>{t('buttons.save')}</button>
                    <button className={'registration-button'} onClick={() => navigate("/")}>{t('buttons.toMain')}</button>
                </div>
            </div>
        </div>
    )
}