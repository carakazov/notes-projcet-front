import './userpage.css'
import {useParams} from "react-router";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";
import {getPersonalData} from "../../api/logicApi";
import UserCard from "../usercard/UserCard";
import {useTranslation} from "react-i18next";
import EditData from "../editdata/EditData";

export default function UserPage() {
    const params = useParams()
    const {t} = useTranslation()
    const userExternalId = params.externalId
    const {userData, handleFatalError} = useContext(GlobalContext)
    const [userInfo, setUserInfo] = useState()
    const [isCurrentUserPage, hasCurrentUserPage] = useState(false)
    const [isDataUpdated, hasDataUpdated] = useState(true)
    const [isEditingInProcess, hasEditingInProcess] = useState(false)

    function stopEditing() {
        hasEditingInProcess(false)
    }

    useEffect(() => {
        if(isDataUpdated) {
            if(userData.externalId === userExternalId) {
                hasCurrentUserPage(true)
            }
            getPersonalData(userExternalId)
                .then(result => setUserInfo(result))
                .catch(() => handleFatalError())
            hasDataUpdated(false)
        }
    }, [isDataUpdated])

    const editButtonClassName = isEditingInProcess ? 'change-button change-button-editing' : 'change-button'

    const changeButton = isCurrentUserPage ? <button onClick={() => hasEditingInProcess(!isEditingInProcess)} className={editButtonClassName}>{t('buttons.change')}</button> : null
    const userCard = isEditingInProcess ? <EditData userInfo={userInfo} stopEditing={stopEditing} updatedFunction={hasDataUpdated}/> : userInfo ? <UserCard userInfo={userInfo} updatedFunction={hasDataUpdated}/> : null


    return(
        <div className={'user-info-page'}>
            {userCard}
            {changeButton}
        </div>
    )
}