// ProtectedRoute.js
import React from 'react';
import { View, Text } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../Context/authContext';

// Middleware component to protect routes
const ProtectedRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <>
      {authenticated ? (
        <Component {...rest} />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>You need to be authenticated to access this page.</Text>
        </View>
      )}
    </>
  );
};

export default ProtectedRoute;
