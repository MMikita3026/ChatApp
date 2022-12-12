import React, { useEffect, useState } from "react";
import {} from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/Main";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import HomeView from "./HomeView";
import { signOut } from "../../firebase/authentication";
import { SimpleUser } from "../../firebase/firestore/users/types";
import { subscribeToUserDataChange } from "../../firebase/firestore/users";
import { useSession } from "../../providers/UserProvider";

type HomePropsType = NativeStackScreenProps<MainStackParamList, 'Home'>
type NavigationHomeProp = NavigationProp<MainStackParamList, 'Home'>

const Home: React.FC<HomePropsType> = (props) => {
  const { user: currentUser } = useSession();
  const navigation = useNavigation<NavigationHomeProp>();
  const [contacts, setContacts] = useState<SimpleUser["contacts"]>([]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      console.log('Error while signing out', e);
    }
  }

  const handleAddContact = () => {
    navigation.push('UsersList', { userId: null });
  }

  const handleContactPress = (contactId: string) => {
    navigation.push('Chat', { interlocutorId: contactId });
  }

  const handleUserChange = (newData: SimpleUser) => {
    if (JSON.stringify(newData.contacts) !== JSON.stringify(contacts)) {
      setContacts(newData.contacts);
    }
  }

  useEffect(() => {
    const unsubscribe = subscribeToUserDataChange(currentUser.uid, handleUserChange);

    return () => unsubscribe();
  }, [])

  return (
    <HomeView
      onSignOut={handleSignOut}
      onAddContact={handleAddContact}
      contacts={contacts}
      onContactPress={handleContactPress}
    />
  );
}

export default Home;
