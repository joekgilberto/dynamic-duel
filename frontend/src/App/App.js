import './App.css';

import Header from '../components/Header/Header';
import Main from '../components/Main/Main';

import { useState, useEffect } from 'react';
import { UserContext } from '../data';
import { getUserToken, setUserToken, getUser } from '../utilities/auth/auth-token';
function App() {
  const initUser = getUser()
  const { Provider: UserInfo } = UserContext;
  const [currentUser, setCurrentUser] = useState(initUser);
  const [auth, setAuth] = useState(null)

  useEffect(()=>{
    setCurrentUser(getUser())
    setUserToken(getUserToken())
  },[])

  return (
    <div className="App">
      <UserInfo
        value={{
          user: currentUser,
          setCurrentUser: setCurrentUser,
          auth: auth,
          setAuth: setAuth
        }}
      >
        <Header />
        <Main />
      </UserInfo>
    </div>
  );
}

export default App;
