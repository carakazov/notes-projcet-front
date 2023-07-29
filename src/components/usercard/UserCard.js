import './usercard.css'
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import {Fragment, useContext} from "react";
import AboutMe from "../aboutme/AboutMe";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";

export default function UserCard(props) {
    const {userInfo, updatedFunction} = props
    const {userData} = useContext(GlobalContext)
    const {t} = useTranslation()
    const navigate = useNavigate()
    const favoriteBook = userInfo.additionalInfo.filter(item => item.type === 'favoriteBook')?.at(0)
    const favoriteFilm = userInfo.additionalInfo.filter(item => item.type === 'favoriteFilm')?.at(0)
    const aboutMe = userInfo.additionalInfo.filter(item => item.type === 'aboutMe')?.at(0)?.value


    const favoriteBookBlock = favoriteFilm ? <p className={'additional-info-line'}>{`${t('labels.favoriteBook')} - ${favoriteBook.value}`}</p> : null
    const favoriteFilmBlock = favoriteFilm ? <p className={'additional-info-line'}>{`${t('labels.favoriteFilm')} - ${favoriteFilm.value}`}</p> : null

    let additionalInfoBlock
    if(!favoriteBookBlock && !favoriteFilmBlock) {
        additionalInfoBlock = <AboutMe content={aboutMe} userInfo={userInfo} updatedFunction={updatedFunction}/>
    } else {
        additionalInfoBlock =
        <Fragment>
            {favoriteBookBlock}
            {favoriteFilmBlock}
            <AboutMe content={aboutMe} userInfo={userInfo} updatedFunction={updatedFunction}/>
        </Fragment>
    }

    function toAccessGrant() {
        navigate(`/grant/${userInfo.externalId}`)
    }

    const toAccessGrantButton = userData.externalId !== userInfo.externalId ? <button onClick={toAccessGrant} className={'to-main-button'}>{t('buttons.grantAccess')}</button> : null

    return(
        <div className={'user-card-wrapper'}>
            <div className={'info-blocks'}>
                <div className={'upper-line'}>
                    <div className={'primary-info-block'}>
                        <div className={'name-block'}>
                            <h1 className={'name-header'}>{`${userInfo.surname} ${userInfo.name}`} <br/> {userInfo.middleName}</h1>
                        </div>
                        <div className={'birthdate-block'}>
                            <p className={'birthdate'}>{userInfo.birthDate}</p>
                        </div>
                        <div className={'email-block'}>
                            <p className={'email'}>{userInfo.email}</p>
                        </div>
                    </div>
                </div>
                <div className={'additional-info-div'}>
                    {additionalInfoBlock}
                </div>
            </div>
            <div className={'user-page-controls'}>
                <button onClick={() => navigate("/")} className={'to-main-button'}>{t('buttons.toMain')}</button>
                {toAccessGrantButton}
            </div>
        </div>
    )
}