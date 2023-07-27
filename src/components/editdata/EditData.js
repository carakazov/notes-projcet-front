import './editdata.css'
import {useTranslation} from "react-i18next";
import {useContext, useState} from "react";
import {isStringEmpty} from "../../validators/stringValidator";
import {updateClient} from "../../api/logicApi";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";

export default function EditData(props) {
    const {setUserData, handleFatalError} = useContext(GlobalContext)
    const {userInfo, stopEditing, updatedFunction} = props
    const favoriteBook = userInfo.additionalInfo.filter(item => item.type === 'favoriteBook')?.at(0)
    const favoriteFilm = userInfo.additionalInfo.filter(item => item.type === 'favoriteFilm')?.at(0)

    const {t} = useTranslation()
    const [newName, setNewName] = useState(userInfo.name)
    const [newSurname, setNewSurname] = useState(userInfo.surname)
    const [newMiddleName, setNewMiddleName] = useState(userInfo.middleName)
    const [newEmail, setNewEmail] = useState(userInfo.email)
    const [newFavoriteBook, setNewFavoriteBook] = useState(favoriteBook.value)
    const [newFavoriteFilm, setNewFavoriteFilm] = useState(favoriteFilm.value)
    const [error, setError] = useState({})
    const [isChanged, hasChanged] = useState(false)


    function validate() {
        let correct = true
        let errorObject = {}
        if(isStringEmpty(newName)) {
            correct = false
            errorObject.nameRequired = t('messages.itIsRequiredField')
        }
        if(isStringEmpty(newSurname)) {
            correct = false
            errorObject.surnameRequired = t('messages.itIsRequiredField')
        }
        if(isStringEmpty(newEmail)) {
            correct = false
            errorObject.emailRequired = t('messages.itIsRequiredField')
        } else {
            const emailRegexp = new RegExp(
                /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
            )
            if(!emailRegexp.test(newEmail)) {
                correct = false
                errorObject.notEmail = t('messages.inputCorrectEmail')
            }
        }
        setError(errorObject)
        return correct
    }

    const nameError = error.nameRequired ? <p className={'error-message'}>{error.nameRequired}</p> : null
    const surnameError = error.surnameRequired ? <p className={'error-message'}>{error.surnameRequired}</p> : null
    const emailRequired = error.emailRequired ? <p className={'error-message'}>{error.emailRequired}</p> : null
    const emailRegex = error.notEmail ? <p className={'error-message'}>{error.notEmail}</p> : null

    function edit() {
        if(validate() && isChanged) {
            let request = {
               newValues: {},
               changeAdditionalInfo: []
            }

            if(userInfo.name !== newName) {
                request.newValues.NEW_NAME = newName
            }

            if(userInfo.surname !== newSurname) {
                request.newValues.NEW_SURNAME = newSurname
            }

            if(userInfo.middleName !== newMiddleName) {
                request.newValues.NEW_MIDDLE_NAME = newMiddleName
            }

            if(userInfo.email !== newEmail) {
                request.newValues.NEW_EMAIL = newEmail
            }

            if(favoriteBook !== newFavoriteBook) {
                request.changeAdditionalInfo.push(
                    {
                        newValue: newFavoriteBook,
                        type: 'favoriteBook'
                    }
                )
            }

            if(favoriteFilm !== newFavoriteFilm) {
                request.changeAdditionalInfo.push(
                    {
                        newValue: newFavoriteFilm,
                        type: 'favoriteFilm'
                    }
                )
            }

            updateClient(request)
                .then(result => {
                    setUserData(result)
                    updatedFunction(true)
                    stopEditing()
                })
                .catch(() => handleFatalError())
        }
    }

    return(
        <div className={'edit-data-form'}>
            <div className={'edit-data-block edit-data-form-item'}>
                <div className={'edit-data-labels'}>
                    <label className={'edit-data-label'}>{t('labels.name')}</label>
                    <label className={'edit-data-label'}>{t('labels.surname')}</label>
                    <label className={'edit-data-label'}>{t('labels.middleName')}</label>
                    <label className={'edit-data-label'}>{t('labels.email')}</label>
                    {favoriteBook ? <label className={'edit-data-label'}>{t('labels.favoriteBook')}</label> : null}
                    {favoriteFilm ? <label className={'edit-data-label'}>{t('labels.favoriteFilm')}</label> : null}
                </div>
                <div className={'edit-data-inputs'}>
                    <div className={'edit-block'}>
                        <input className={'edit-data-input'} defaultValue={userInfo.name} onChange={e => {
                            setNewName(e.currentTarget.value)
                            hasChanged(true)
                        }}/>
                        {nameError}
                    </div>
                    <div className={'edit-block'}>
                        <input className={'edit-data-input'} defaultValue={userInfo.surname} onChange={e => {
                            setNewSurname(e.currentTarget.value)
                            hasChanged(true)
                        }}/>
                        {surnameError}
                    </div>
                    <div className={'edit-block'}>
                        <input className={'edit-data-input'} defaultValue={userInfo.middleName} onChange={e => {
                            setNewMiddleName(e.currentTarget.value)
                            hasChanged(true)
                        }}/>
                    </div>
                    <div className={'edit-block'}>
                        <input className={'edit-data-input'} defaultValue={userInfo.email} onChange={e => {
                            setNewEmail(e.currentTarget.value)
                            hasChanged(true)
                        }}/>
                        {emailRequired}
                        {emailRegex}
                    </div>
                    {favoriteBook ? <input className={'edit-data-input'} defaultValue={favoriteBook.value} onChange={e => {
                        setNewFavoriteBook(e.currentTarget.value)
                        hasChanged(true)
                    }}/> : null}
                    {favoriteFilm ? <input className={'edit-data-input'} defaultValue={favoriteFilm.value} onChange={e => {
                        setNewFavoriteFilm(e.currentTarget.value)
                        hasChanged(true)
                    }}/> : null}
                </div>
            </div>
            <div className={'edit-data-buttons edit-data-form-item'}>
                <button onClick={edit} className={'save-button'}>{t('buttons.save')}</button>
            </div>
        </div>
    )
}