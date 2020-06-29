import React, { useState } from 'react';
import { withContext } from "with-context";

import CEmptyUser from './Users/CEmptyUser.js';
import CUserAPI from './Users/CUserAPI.js';

export const UserContext = React.createContext();

export default ({ children }) => {
  const [User, setUser] = useState(new CEmptyUser({api: new CUserAPI()}));
  User.ctx = val => {
    setUser(val);
    return val;
  };

  return (
    <UserContext.Provider value={User}>
      {children}
    </UserContext.Provider>
  );
};

export const withUser = withContext(UserContext, 'User');
