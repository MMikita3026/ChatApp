import React, { useState } from "react";
import SignUpView from "./SignUpView";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamList } from "../../navigation/Authentication";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { LayoutAnimation } from "react-native";
import { signUpUserWithEmailAndPassword } from "../../firebase/authentication";
import { createUser } from "../../firebase/firestore/users";

type SignUpPropsType = NativeStackScreenProps<AuthenticationStackParamList, 'SignUp'>;
type NavigationLoginProp = NavigationProp<
  AuthenticationStackParamList,
  'SignUp'
>

const SignUp: React.FC<SignUpPropsType> = (props) => {
  const navigation = useNavigation<NavigationLoginProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTermAndPrivacyPress = () => {
    console.log('term and privacy test');
  }

  const handleTabChange = () => {
    navigation.replace('Login');
  }

  const handlePasswordShowToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsPasswordVisible((prev) => !prev);
  }

  const returnStateToInitial = () => {
    setEmail('');
    setPassword('');
    setName('');
    setPhoneNumber('');
    setIsPasswordVisible(false);
  }

  const handleSignUp = async () => {
    setIsLoading(true);

    try {
      const newUser = await signUpUserWithEmailAndPassword(email, password);
      await createUser(newUser?.uid, name, phoneNumber);
      returnStateToInitial();
    } catch (e) {
      console.log('Error while signing up', e);
    }

    setIsLoading(false);
  }

  return (
    <SignUpView
      onTermAndPrivacyPress={handleTermAndPrivacyPress}
      onTabChange={handleTabChange}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      onPasswordShowToggle={handlePasswordShowToggle}
      isPasswordVisible={isPasswordVisible}
      onSignUp={handleSignUp}
      name={name}
      setName={setName}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
    />
  );
};

export default SignUp;
