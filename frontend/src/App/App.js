import './App.css';

import Header from '../components/Header/Header';
import Main from '../components/Main/Main';

import { useState } from 'react';
import { UserContext } from '../data';

function App() {
  const { Provider: UserInfo } = UserContext;
  const [currentUser, setCurrentUser] = useState(null);
  const [auth, setAuth] = useState(null)

  return (
    <div className="App">
      <UserInfo
        value={{
          user: currentUser,
          setUser: setCurrentUser,
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
