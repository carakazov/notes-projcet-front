import './App.css';
import LoginForm from "../loginform/LoginForm";
import {useEffect, useState} from "react";
import {AuthContext} from "../../conxtexts/authcontext/authContext";
import {CURRENT_USER_DATA, LOCAL_FOLDER} from "../../constants/tokenConstants";
import TabHeader from "../tabheader/TabHeader";
import TabHeaderAndLogin from "../tabheaderandlogin/TabHeaderAndLogin";
import MainPage from "../mainpage/MainPage";
import {startLocalStorage} from "../../starter/localStorageHelper";

function App() {
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem(CURRENT_USER_DATA)))

  useEffect(() => {
      startLocalStorage()
  }, [])

  return (
      <div>
        <AuthContext.Provider value={{userData, setUserData}}>
            <MainPage/>
        </AuthContext.Provider>
      </div>
  );
}

export default App;
