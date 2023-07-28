import './shortclientinfo.css'
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";

export default function ShortClientInfo(props) {
    const {t} = useTranslation()
    const {userInfo} = props
    const navigate = useNavigate()

    function goToPage() {
        navigate(`/user/${userInfo.externalId}`)
    }

    return(
        <div className={'client-info-wrapper'}>
            <div className={'clients-list client-info-item'}>
                {`${userInfo.name} ${userInfo.surname}`}
            </div>
            <div className={'go-to-page-button-wrapper client-info-item'}>
                <button onClick={goToPage} className={'go-to-page-button'}>{t('buttons.toPage')}</button>
            </div>
        </div>
    )
}