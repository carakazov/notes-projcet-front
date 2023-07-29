import './commonaccessgrant.css'
import {useNavigate, useParams} from "react-router";
import {Fragment, useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";
import {getClientFolders, getPersonalData, grantAccess, readDirectory} from "../../api/logicApi";
import {useTranslation} from "react-i18next";

export default function CommonAccessGrant() {
    const params = useParams()
    const externalId = params.externalId
    const {t} = useTranslation()
    const {handleFatalError} = useContext(GlobalContext)
    const [accessMode, setAccessMode] = useState("READ")
    const [noteExternalId, setNoteExternalId] = useState("")
    const [isGrantSuccess, hasGrantSuccess] = useState(false)
    const [isPending, hasPending] = useState(true)
    const [userToGrant, setUserToGrant] = useState()
    const navigate = useNavigate()

    const [notesToRender, setNotesToRender] = useState([])

    useEffect(() => {
        getClientFolders()
            .then(result => {
                getAllNotesAndUser(result.directories)
                    .then(notesAndUser => {
                        setNotesToRender(notesAndUser.notes)
                        setNoteExternalId(notesAndUser.notes.at(0).externalId)
                        setUserToGrant(notesAndUser.user)
                        hasPending(false)
                    })
                    .catch(() => handleFatalError())
            })
            .catch(() => handleFatalError())
    }, [])

    async function getAllNotesAndUser(directories) {
        const notes = []
        const dirs = []
        const user = await getPersonalData(externalId)
        for(let dir of directories) {
            let fullDir = await readDirectory(dir.externalId)
            dirs.push(fullDir)
        }
        for(let dir of dirs) {
            dir.notes.forEach(item => notes.push(item))
        }
        return {notes, user}
    }

    function callGrantAccess() {
        let body = {
            accessMode: accessMode,
            clientExternalId: externalId,
            noteExternalId: noteExternalId
        }
        grantAccess(body)
            .then(() => {
                hasGrantSuccess(true)
                setTimeout(() => hasGrantSuccess(false), 3000)
            })
            .catch(() => handleFatalError)
    }

    const contentBlock =
        <Fragment>
            <div className={'grant-access-inputs'}>
                <div className={'select-note-wrapper'}>
                    <select className={'grant-access-select'} onChange={e => setNoteExternalId(e.target.value)}>
                        {notesToRender.map((item) => <option value={item.externalId}>{item.title}</option>)}
                    </select>
                </div>
                <div className={'select-access-mode-wrapper'}>
                    <select className={'grant-access-select'} onChange={e => setAccessMode(e.target.value)}>
                        <option value={'READ'}>{t('labels.read')}</option>
                        <option value={'READ_WRITE'}>{t('labels.write')}</option>
                    </select>
                </div>
            </div>
            <div className={'select-access-mode-controls'}>
                <button className={'to-main-button grant-access-button'} onClick={callGrantAccess}>{t('buttons.grantAccess')}</button>
                <button className={'to-main-button grant-access-button'} onClick={() => navigate("/")}>{t('buttons.toMain')}</button>
            </div>
        </Fragment>

    const loadingContent =
        <div className={'loading-wrapper'}>
            {t('labels.loading')}
        </div>

    return(
        <div className={'grant-access-page'}>
            {isPending ? null :
                <div className={'user-wrapper'}>
                    <h1>{`${t('labels.grantFor')} ${userToGrant?.surname} ${userToGrant?.name}`}</h1>
                </div>
            }
            <div className={'grant-access-wrapper'}>
                {isPending ? loadingContent : contentBlock}
            </div>
            <div className={'success-message-wrapper'}>
                {isGrantSuccess ? <h2>{t('labels.accessGranted')} </h2> : null}
            </div>
        </div>
    )
}