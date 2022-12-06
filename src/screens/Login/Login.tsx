import React from 'react';
import LoginView from "./LoginView";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamList } from "../../navigation/Authentication";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type LoginPropsType = NativeStackScreenProps<AuthenticationStackParamList, 'Login'>;
type NavigationLoginProp = NavigationProp<
  AuthenticationStackParamList,
  'Login'
>

const Login: JSX.Element = (props: LoginPropsType) => {
  const navigation = useNavigation<NavigationLoginProp>();

  const handleTermAndPrivacyPress = () => {
    console.log('term and privacy test');
  }

  const handleTabChange = () => {
    navigation.replace('SignUp');
  }

  return (
    <LoginView
      onTermAndPrivacyPress={handleTermAndPrivacyPress}
      onTabChange={handleTabChange}
    />
  );
};

export default Login;
