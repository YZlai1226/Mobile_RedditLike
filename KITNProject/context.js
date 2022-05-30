import React, { createContext } from 'react';

export default createContext({
  setIsLoggedIn: (isLoggedIn) => {},
  accessToken: '',
  setAccessToken: (accesToken) => {}

});
