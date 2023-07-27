import './aboutme.css'
import {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {updateClient} from "../../api/logicApi";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";

export default function AboutMe(props) {
    const {content, userInfo, updatedFunction} = props
    const [newContent, setNewContent] = useState('')
    const [currentContent, setCurrentContent] = useState(content)
    const {handleFatalError, userData} = useContext(GlobalContext)
    const [lengthError, setLengthError] = useState()
    const {t} = useTranslation()

    function updateAboutMe() {
        if(newContent !== currentContent) {
            const updateRequest = {
                newValues: {},
                changeAdditionalInfo: [
                    {
                        type: 'aboutMe',
                        newValue: newContent
                    }
                ]
            }
            if(newContent.length < 3000) {
                updateClient(updateRequest)
                    .then(() => {
                        setCurrentContent(newContent)
                        updatedFunction(true)
                    })
                    .catch(() => handleFatalError())
            } else {
                setLengthError(t('messages.lessThan3000Symbols'))
            }
        }
    }

    const clientButton = userInfo.externalId === userData.externalId ? <button className={'save-button'} onClick={updateAboutMe}>{t('buttons.save')}</button> : null
    const error = lengthError ? <p className={'error-message'}>{lengthError}</p> : null
    return(
        <div className={'about-me-wrapper'}>
            <p>{t('labels.aboutMe')}</p>
            <textarea className={'about-me-textarea'} onChange={e => setNewContent(e.currentTarget.value)} readOnly={false} defaultValue={currentContent}/>
            {error}
            {clientButton}
        </div>
    )
}