import './App.css';
import LoginForm from "../loginform/LoginForm";
import {useEffect, useState} from "react";
import {GlobalContext} from "../../conxtexts/authcontext/globalContext";
import {CURRENT_USER_DATA, LOCAL_FOLDER} from "../../constants/tokenConstants";
import TabHeader from "../tabheader/TabHeader";
import TabHeaderAndLogin from "../tabheaderandlogin/TabHeaderAndLogin";
import MainPage from "../mainpage/MainPage";
import {reloadLocalStorage, startLocalStorage} from "../../starter/localStorageHelper";

function App() {
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem(CURRENT_USER_DATA)))
  const [folderIdToReload, setFolderIdToReload] = useState()

  useEffect(() => {
      startLocalStorage()
  }, [])


  return (
      <div>
        <GlobalContext.Provider value={{userData, setUserData, folderIdToReload, setFolderIdToReload}}>
            <MainPage/>
        </GlobalContext.Provider>
      </div>
  );
}

export default App;
