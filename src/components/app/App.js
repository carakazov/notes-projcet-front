import './App.css';
import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";
import {CURRENT_USER_DATA, LOCAL_FOLDER} from "../../constants/tokenConstants";
import MainPage from "../mainpage/MainPage";
import {startLocalStorage} from "../../starter/localStorageHelper";
import RegisterPage from "../registerpage/RegisterPage";
import {MAIN_PAGE_PATH, REGISTER_PAGE_PATH} from "../../constants/pathConstants";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";

function App() {
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem(CURRENT_USER_DATA)))
    const [folderIdToReload, setFolderIdToReload] = useState()
    const [isFatalError, hasFatalError] = useState(false)
    const {t} = useTranslation()
    const navigate = useNavigate()

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
        <main>
          <GlobalContext.Provider value={{userData, setUserData, folderIdToReload, setFolderIdToReload, handleFatalError}}>
              <Routes>
                  <Route exact path={MAIN_PAGE_PATH} element={<MainPage/>}></Route>
                  <Route exact path={REGISTER_PAGE_PATH} element={<RegisterPage/>}></Route>
              </Routes>
          </GlobalContext.Provider>
        </main>
    );
}

export default App;
