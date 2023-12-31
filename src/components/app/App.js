import './App.css';
import {Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";
import {CURRENT_USER_DATA, LOCAL_FOLDER} from "../../constants/tokenConstants";
import MainPage from "../mainpage/MainPage";
import {startLocalStorage} from "../../starter/localStorageHelper";
import RegisterPage from "../registerpage/RegisterPage";
import {
    ABOUT,
    ACCESSED_NOTES_PATH,
    ACCESSORS_LIST_PATH,
    GRANT_COMMON_ACCESS_PATH,
    LIST_PAGE_PATH,
    MAIN_PAGE_PATH,
    REGISTER_PAGE_PATH, RESTORE_PASSWORD,
    USER_PAGE_PATH
} from "../../constants/pathConstants";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import UserPage from "../userpage/UserPage";
import AllClients from "../allclients/AllClients";
import CommonAccessGrant from "../commonaccessgrant/CommonAccessGrant";
import AccessorList from "../accessorslist/AccessorsList";
import AccessedNotesPage from "../accessednotespage/AccessedNotesPage";
import RestorePasswordPage from "../restorepasswordpage/RestorePasswordPage";

const AdminApp = React.lazy(() => import('AdminApp/App'))

function App() {
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem(CURRENT_USER_DATA)))
    const [folderIdToReload, setFolderIdToReload] = useState()
    const [isFatalError, hasFatalError] = useState(false)
    const {t} = useTranslation()
    const navigate = useNavigate()

    const [crutch, setCrutch] = useState(true)
    //Не смотрите сюда, это такой костыль
    useEffect(() => {
        if(crutch) {
            navigate("/")
            setCrutch(false)
        }
    }, [crutch])

    useEffect(() => {
        startLocalStorage()
    }, [])

    function handleFatalError() {
        hasFatalError(true)
    }

    function goToMainAfterError() {
        hasFatalError(false)
        navigate("/")
    }

    if(isFatalError) {
        return(
            <div className={'fatal-error-page'}>
                <div className={'fatal-error-message-wrapper'}>
                    <h1>{t('messages.fatalError')}</h1>
                    <div className={'to-main-button-wrapper'}>
                        <button onClick={goToMainAfterError} className={'to-main-button'}>{t('buttons.toMain')}</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
          <GlobalContext.Provider value={{userData, setUserData, folderIdToReload, setFolderIdToReload, handleFatalError}}>
              <Routes>
                  <Route exact path={MAIN_PAGE_PATH} element={<MainPage/>}></Route>
                  <Route exact path={REGISTER_PAGE_PATH} element={<RegisterPage/>}></Route>
                  <Route exact path={USER_PAGE_PATH} element={<UserPage/>}></Route>
                  <Route exact path={LIST_PAGE_PATH} element={<AllClients/>}></Route>
                  <Route exact path={GRANT_COMMON_ACCESS_PATH} element={<CommonAccessGrant/>}></Route>
                  <Route exact path={ACCESSORS_LIST_PATH} element={<AccessorList/>}></Route>
                  <Route exact path={ACCESSED_NOTES_PATH} element={<AccessedNotesPage/>}></Route>
                  <Route exact path={RESTORE_PASSWORD} element={<RestorePasswordPage/>}></Route>
                  <Route exact path={'/admin/*'} element={<AdminApp/>}></Route>
              </Routes>
          </GlobalContext.Provider>
    );
}

export default App;
