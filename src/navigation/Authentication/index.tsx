import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/Login';
import SignUp from '../../screens/SignUp';

export type AuthenticationStackParamList = {
  Login: undefined,
  SignUp: undefined,
}

const AuthenticationStack = createNativeStackNavigator<AuthenticationStackParamList>();

const Authentication = () => {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Group screenOptions={{ headerShown: false }}>
        <AuthenticationStack.Screen name="Login" component={Login} />
        <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      </AuthenticationStack.Group>
    </AuthenticationStack.Navigator>
  );
};

export default Authentication;
