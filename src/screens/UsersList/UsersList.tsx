import React, { useEffect, useState } from "react";
import { LayoutAnimation } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/Main";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import UsersListView from "./UsersListView";
import { SimpleUser } from "../../firebase/firestore/users/types";
import { addContactToUser, getUsers } from "../../firebase/firestore/users";
import { useSession } from "../../providers/UserProvider";

type UsersListPropsType = NativeStackScreenProps<MainStackParamList, 'UsersList'>
type NavigationUsersListProp = NavigationProp<MainStackParamList, 'UsersList'>

const UsersList: React.FC<UsersListPropsType> = (props) => {
  const { user: currentUser } = useSession();
  const navigation = useNavigation<NavigationUsersListProp>();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<Array<SimpleUser> | []>([]);
  const [isContactAdding, setIsContactAdding] = useState<boolean>(false);

  const getUsersList = async () => {
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (e) {
      console.log('Error while loading the list of users', e);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsLoading(false)
  }

  useEffect(() => {
    getUsersList();
  }, [])

  const handleAddContact = async (contactId: string) => {
    setIsContactAdding(true);
    try {
      await addContactToUser(currentUser.uid, contactId);
    } catch (e) {
      console.log('Error while adding contact', e);
    }
    navigation.goBack();
    setIsContactAdding(false);
  }

  return (
    <UsersListView
      isLoading={isLoading}
      users={users}
      onAddContact={handleAddContact}
      isContactAdding={isContactAdding}
    />
  );
}

export default UsersList;
