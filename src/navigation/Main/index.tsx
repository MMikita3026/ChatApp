import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../../screens/Home";
import { AuthenticatedUser } from "../../providers/UserProvider";
import UsersList from "../../screens/UsersList";
import Chat from "../../screens/Chat";

export type MainStackParamList = {
  Home: undefined,
  UsersList: {
    userId: AuthenticatedUser["uid"];
  };
  Chat: {
    interlocutorId: string;
  };
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
        <MainStack.Screen name="Chat" component={Chat} />
      </MainStack.Group>
    </MainStack.Navigator>
  );
};

export default Main;
