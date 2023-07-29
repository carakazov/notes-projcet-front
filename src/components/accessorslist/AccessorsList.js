import './accessorslist.css'
import {useNavigate, useParams} from "react-router";
import {Fragment, useContext, useEffect, useState} from "react";
import {getAllAccessors} from "../../api/logicApi";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";
import {useTranslation} from "react-i18next";
import Accessor from "../accessor/Accessor";
import {DenyAccessContext} from "../../conxtexts/denyaccesscontext/denyAccessContext";

export default function AccessorList() {
    const params = useParams()
    const externalId = params.externalId
    const {handleFatalError} = useContext(GlobalContext)
    const {t} = useTranslation()
    const navigate = useNavigate()

    const [accessors, setAccessors] = useState([])
    const [isReload, hasReload] = useState(true)
    const [isPending, hasPending] = useState(true)

    useEffect(() => {
        if(isReload) {
            getAllAccessors(externalId)
                .then(result => {
                    setAccessors(result.accessors)
                    hasReload(false)
                    hasPending(false)
                })
                .catch(() => handleFatalError())
        }
    }, [isReload])

    const accessorsList = accessors.length > 0 ?
        accessors.map(item => <Accessor accessor={item} noteExternalId={externalId} key={externalId}/>) :
        <p className={'only-you-wrapper'}>{t('labels.onlyYouHaveAccess')}</p>


    const loadingBlock =
        <Fragment>
            <p>{t('labels.loading')}</p>
        </Fragment>

    return(
        <div className={'accessors-list-page'}>
            <div className={'accessors-list-wrapper'}>
                <div className={'accessors-block accessors-list-wrapper-item'}>
                    <DenyAccessContext.Provider value={{hasReload}}>
                        {isPending ? loadingBlock : accessorsList}
                    </DenyAccessContext.Provider>
                </div>
                <div className={'accessors-list-home-button accessors-list-wrapper-item'}>
                    <button className={'go-home-button'} onClick={() => navigate("/")}>{t('buttons.toMain')}</button>
                </div>
            </div>
        </div>
    )
}