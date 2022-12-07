import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../../screens/Home";

export type MainStackParamList = {
  Home: undefined,
}

const MainStack = createNativeStackNavigator<MainStackParamList>();

const Main = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Group screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Home" component={Home} />
      </MainStack.Group>
    </MainStack.Navigator>
  );
};

export default Main;
