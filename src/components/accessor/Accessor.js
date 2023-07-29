import './accessor.css'
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import {useContext} from "react";
import {DenyAccessContext} from "../../conxtexts/denyaccesscontext/denyAccessContext";
import {denyNote} from "../../api/logicApi";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";

export default function Accessor(props) {
    const {accessor, noteExternalId} = props
    const {hasReload} = useContext(DenyAccessContext)
    const {handleFatalError} = useContext(GlobalContext)
    const {t} = useTranslation()
    const navigate = useNavigate()

    function goToUserPage() {
        navigate(`/user/${accessor.externalId}`)
    }

    function callDenyAccess() {
        denyNote(noteExternalId, accessor.externalId)
            .then(() => hasReload(true))
            .catch(() => handleFatalError())
    }

    return(
        <div className={'accessor-wrapper'}>
            <div className={'user-info-block'}>
                <div className={'personal-info user-info-block-item'}>
                    <p onClick={goToUserPage} className={'user-info-line'}>{`${accessor.surname} ${accessor.name} ${accessor.middleName}`}</p>
                </div>
                <div className={'access-type-wrapper user-info-block-item'}>
                    <p>{accessor.accessMode === 'READ' ? t('labels.read') : t('labels.write')}</p>
                </div>
            </div>
            <div className={'deny-access-button-block'}>
                <button onClick={callDenyAccess} className={'deny-access-button'}>{t('buttons.denyAccess')}</button>
            </div>
        </div>
    )
}