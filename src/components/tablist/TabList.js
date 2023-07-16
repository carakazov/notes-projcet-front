import './tablist.css'
import {useContext, useEffect, useState} from "react";
import {CurrentNoteContext} from "../../conxtexts/currentnotecontext/currentNoteContext";
import Tab from "../tab/Tab";
import {useTranslation} from "react-i18next";

export default function TabList() {
    const [tabs, setTabs] = useState([])
    const [workingArray, setWorkingArray] = useState([])
    const [currentStartIndex, setCurrentStartIndex] = useState(0)
    const {currentNote, tabToHide, isCloseAllTabs, hasCloseAllTabs} = useContext(CurrentNoteContext)
    const {t} = useTranslation()
    useEffect(() => {
        let arr = tabs
        if(tabs.length > 0) {
            for(let externalId of tabToHide) {
                arr = arr.filter(item => item.externalId !== externalId)
            }
            setTabs(arr)
        }
    }, [tabToHide])

    useEffect(() => {
        if(isCloseAllTabs) {
            setTabs([])
            hasCloseAllTabs(false)
        }
    }, [isCloseAllTabs])

    useEffect(() => {
        if(currentNote) {
            console.log(currentNote.externalId)
            if(!tabs.find(item => item.externalId === currentNote.externalId)) {
                setTabs([...tabs, currentNote])
            }
        }
    }, [currentNote])

    useEffect(() => {
        let array = tabs
        if(array.length > 5) {
            array = array.slice(currentStartIndex, currentStartIndex + 5)
        }
        setWorkingArray(array)
    }, [tabs, currentStartIndex])

    function prev() {
        if(currentStartIndex > 0) {
            let index = currentStartIndex - 1
            setCurrentStartIndex(index)
        }
    }

    function next() {
        if(currentStartIndex < tabs.length - 5) {
            let index = currentStartIndex + 1
            setCurrentStartIndex(index)
        }
    }

    return(
        <div className={'tab-list'}>
            <div hidden={tabs.length < 6} className={'tab-control'} onClick={prev}>
                {t('labels.prev')}
            </div>
            <div className={'tabs-container'}>
                {workingArray.map(item => <Tab note={item} key={item.externalId}/>)}
            </div>
            <div hidden={tabs.length < 6} className={'tab-control'} onClick={next}>
                {t('labels.next')}
            </div>
        </div>
    )
}