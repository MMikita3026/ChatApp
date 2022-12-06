import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication, { AuthenticationStackParamList } from "../Authentication";

export type RootStackParamList = {
  Authentication: AuthenticationStackParamList,
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Root = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Authentication" component={Authentication} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default Root;
