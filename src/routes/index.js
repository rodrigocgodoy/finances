import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes = () => {
  const { isLogged } = useContext(AuthContext);

  return !isLogged ? <AuthRoutes /> : <AppRoutes />;
};

export default Routes;
