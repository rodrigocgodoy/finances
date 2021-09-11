import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { AuthContext } from '../contexts/auth';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes = () => {
  const { isLogged, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#131313" />
      </View>
    );
  }

  return !isLogged ? <AuthRoutes /> : <AppRoutes />;
};

export default Routes;
