import React, { useState } from "react";
import LoginView from "./LoginView";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamList } from "../../navigation/Authentication";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { LayoutAnimation } from "react-native";
import { signInUserWithEmailAndPassword } from "../../firebase/authentication";

type LoginPropsType = NativeStackScreenProps<AuthenticationStackParamList, 'Login'>;
type NavigationLoginProp = NavigationProp<
  AuthenticationStackParamList,
  'Login'
>

const Login: React.FC<LoginPropsType> = (props) => {
  const navigation = useNavigation<NavigationLoginProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTermAndPrivacyPress = () => {
    console.log('term and privacy test');
  }

  const handleTabChange = () => {
    navigation.replace('SignUp');
  }

  const handlePasswordShowToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsPasswordVisible((prev) => !prev);
  }

  const returnStateToInitial = () => {
    setEmail('');
    setPassword('');
    setIsPasswordVisible(false);
  }

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      await signInUserWithEmailAndPassword(email, password);
      returnStateToInitial();
    } catch (e) {
      console.log('Error while logging in', e);
    }

    setIsLoading(false);
  }


  return (
    <LoginView
      onTermAndPrivacyPress={handleTermAndPrivacyPress}
      onTabChange={handleTabChange}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      onPasswordShowToggle={handlePasswordShowToggle}
      isPasswordVisible={isPasswordVisible}
      onLogin={handleLogin}
    />
  );
};

export default Login;
