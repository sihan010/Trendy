//Wrap App.js with This Context Provider

import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [authorized, setAuthorized] = useState(false);
  const [tokens, setTokens] = useState({
    consumerKey: 'pZEPXv9Dsepw0UTitnj2O0bkK',
    consumerSecret: 'Rsdgqcew5RmkAmCp0y8vlplL1oKdJz10nYgqrTCw6C5yFagkDC',
    accessToken: '',
    accessTokenSecret: '',
  });
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  return (
    <AuthContext.Provider
      value={{
        authorized,
        setAuthorized,
        tokens,
        setTokens,
        userId,
        setUserId,
        userName,
        setUserName,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
