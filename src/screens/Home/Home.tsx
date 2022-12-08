import React from 'react';
import {} from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/Main";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import HomeView from "./HomeView";
import { signOut } from "../../firebase/authentication";

type HomePropsType = NativeStackScreenProps<MainStackParamList, 'Home'>
type NavigationHomeProp = NavigationProp<MainStackParamList, 'Home'>

const Home: React.FC<HomePropsType> = (props) => {
  const navigation = useNavigation<NavigationHomeProp>();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      console.log('Error while signing out', e);
    }
  }

  const handleAddContact = async () => {
    navigation.push('UsersList', { userId: null });
  }

  return (
    <HomeView onSignOut={handleSignOut} onAddContact={handleAddContact} />
  );
}

export default Home;
