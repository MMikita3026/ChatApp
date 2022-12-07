import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication, { AuthenticationStackParamList } from "../Authentication";
import { useSession } from "../../providers/UserProvider";
import Main from "../Main";

export type RootStackParamList = {
  Authentication: AuthenticationStackParamList,
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Root = () => {
  const { user } = useSession();
  console.log(user);

  if (!user) {
    return (
      <RootStack.Navigator>
        <RootStack.Group screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Authentication" component={Authentication} />
        </RootStack.Group>
      </RootStack.Navigator>
    );
  }

  return (
    <RootStack.Navigator>
      <RootStack.Group screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Main" component={Main} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default Root;
