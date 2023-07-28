import './allclients.css'
import {useContext, useEffect, useState} from "react";
import {getAllClients} from "../../api/logicApi";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";
import {useTranslation} from "react-i18next";
import ShortClientInfo from "../shortclientinfo/ShortClientInfo";
import {useNavigate} from "react-router";

export default function AllClients() {
    const [clientsList, setClientsList] = useState([])
    const [filterString, setFilterString] = useState('')
    const [listToRender, setListToRender] = useState([])
    const {t} = useTranslation()
    const {handleFatalError} = useContext(GlobalContext)
    const navigate = useNavigate()


    useEffect(() => {
        getAllClients()
            .then(result => {
                setClientsList(result.clients)
                setListToRender(result.clients)
            })
            .catch(() => handleFatalError())
    }, [])

    function find(string) {
        const parts = string.split(" ")
        const filteredParts = parts.filter(item => item !== "")
        console.log(filteredParts)
        if(filteredParts.length === 0) {
            setListToRender(clientsList)
        } else {
            const filteredList = clientsList.filter(item => {
                const fullNameString = `${item.surname} ${item.name} ${item.middleName}`
                let find = false
                for(let part of filteredParts) {
                    if(fullNameString.includes(part)) {
                        find = true
                        break
                    }
                }
                return find
            })
            setListToRender(filteredList)
        }
    }

    return(
        <div className={'clients-list-page'}>
            <div className={'filter-string-wrapper clients-list-page-item'}>
                <input placeholder={t('placeholders.search')} className={'filter-string-input'} onChange={e => {
                    setFilterString(e.currentTarget.value)
                    find(e.currentTarget.value)
                }}/>
                <button onClick={() => navigate("/")} className={'to-main-button'}>{t('buttons.toMain')}</button>
            </div>
            <div className={'clients-list-wrapper clients-list-page-item clients-block'}>
                {listToRender.map(item => <ShortClientInfo userInfo={item} key={item.externalId}/>)}
            </div>
        </div>
    )
}