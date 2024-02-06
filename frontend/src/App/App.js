import './App.css';

import Header from '../components/Header/Header';
import Main from '../components/Main/Main';

import { useState, useEffect } from 'react';
import { UserContext } from '../data';
import { getUserToken, getUser, clearUserToken, clearUser } from '../utilities/auth/auth-token';
import { decodeToken } from '../utilities/auth/auth-token';

function App() {
  const initUser = getUser()
  const { Provider: UserInfo } = UserContext;
  const [currentUser, setCurrentUser] = useState(initUser);
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    const token = getUserToken();
    if (token) {
      try {
        const { exp } = decodeToken(token);
        if (Date.now() >= exp * 1000) {
          clearUserToken();
          clearUser();
        }
      } catch (err) {
        clearUserToken();
        clearUser();
      }
    }
    setCurrentUser(getUser())
  }, [])

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
