import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../../screens/Home";
import { AuthenticatedUser } from "../../providers/UserProvider";
import UsersList from "../../screens/UsersList";

export type MainStackParamList = {
  Home: undefined,
  UsersList: {
    userId: AuthenticatedUser["uid"];
  }
}

const MainStack = createNativeStackNavigator<MainStackParamList>();

const Main = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Group screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen
          name="UsersList"
          component={UsersList}
          options={{
            presentation: 'modal',
          }}
        />
      </MainStack.Group>
    </MainStack.Navigator>
  );
};

export default Main;
