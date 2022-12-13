import React, { useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../../screens/Home";
import { AuthenticatedUser, useSession } from "../../providers/UserProvider";
import UsersList from "../../screens/UsersList";
import Chat from "../../screens/Chat";
import messaging from '@react-native-firebase/messaging';
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToken } from "../../firebase/firestore/fcmtokens";

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
  const { user } = useSession();

  const requestUserPermissions = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status', authStatus);
      }
    } catch (e) {
      console.log('Something went wrong during requesting user permissions', e);
    }
  };

  const getToken = async () => {
    const token = await messaging().getToken();
    await addToken(user.uid, token);
  }

  useEffect(() => {
    requestUserPermissions();
    getToken();

    const unsubscribeToForegroundMessage = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('You have new notification', JSON.stringify(remoteMessage));
    })

    return () => {
      unsubscribeToForegroundMessage();
    }
  }, []);

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
