import './userpage.css'
import {useParams} from "react-router";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";
import {getPersonalData} from "../../api/logicApi";
import UserCard from "../usercard/UserCard";
import {useTranslation} from "react-i18next";

export default function UserPage() {
    const params = useParams()
    const {t} = useTranslation()
    const userExternalId = params.externalId
    const {userData, handleFatalError} = useContext(GlobalContext)
    const [userInfo, setUserInfo] = useState()
    const [isCurrentUserPage, hasCurrentUserPage] = useState(false)
    const [isDataUpdated, hasDataUpdated] = useState(true)

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

    const changeButton = isCurrentUserPage ? <button className={'change-button'}>{t('buttons.change')}</button> : null

    return(
        <div className={'user-info-page'}>
            {userInfo ? <UserCard userInfo={userInfo} updatedFunction={hasDataUpdated}/> : null}
            {changeButton}
        </div>
    )
}