import React from 'react';
import SignUpView from "./SignUpView";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamList } from "../../navigation/Authentication";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type SignUpPropsType = NativeStackScreenProps<AuthenticationStackParamList, 'SignUp'>;
type NavigationLoginProp = NavigationProp<
  AuthenticationStackParamList,
  'SignUp'
>

const SignUp: JSX.Element = (props: SignUpPropsType) => {
  const navigation = useNavigation<NavigationLoginProp>();

  const handleTermAndPrivacyPress = () => {
    console.log('term and privacy test');
  }

  const handleTabChange = () => {
    navigation.replace('Login');
  }

  return (
    <SignUpView
      onTermAndPrivacyPress={handleTermAndPrivacyPress}
      onTabChange={handleTabChange}
    />
  );
};

export default SignUp;
