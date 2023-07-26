import './aboutme.css'
import {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {updateClient} from "../../api/logicApi";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";

export default function AboutMe(props) {
    const {content, userInfo, updatedFunction} = props
    const [newContent, setNewContent] = useState('')
    const [currentContent, setCurrentContent] = useState(content)
    const {handleFatalError} = useContext(GlobalContext)
    const {t} = useTranslation()

    function updateAboutMe() {
        if(newContent !== currentContent) {
            const updateRequest = {
                changeAdditionalInfo: [
                    {
                        type: 'aboutMe',
                        newValue: newContent
                    }
                ]
            }
            updateClient(updateRequest)
                .then(() => {
                    setCurrentContent(newContent)
                    updatedFunction(true)
                })
                .catch(() => handleFatalError())
        }
    }

    return(
        <div className={'about-me-wrapper'}>
            <p>{t('labels.aboutMe')}</p>
            <textarea className={'about-me-textarea'} onChange={e => setNewContent(e.currentTarget.value)} readOnly={false} defaultValue={currentContent}/>
            <button className={'save-button'} onClick={updateAboutMe}>{t('buttons.save')}</button>
        </div>
    )
}