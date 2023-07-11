import './App.css';
import LoginForm from "../loginform/LoginForm";
import {useState} from "react";
import {AuthContext} from "../../conxtexts/authcontext/authContext";
import {CURRENT_USER_DATA} from "../../constants/tokenConstants";

function App() {
  let string = sessionStorage.getItem(CURRENT_USER_DATA)
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem(CURRENT_USER_DATA)))

  return (
      <div>
        <AuthContext.Provider value={{userData, setUserData}}>
          <LoginForm/>
        </AuthContext.Provider>
      </div>
  );
}

export default App;
