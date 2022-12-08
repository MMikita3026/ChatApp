import firestore from '@react-native-firebase/firestore';
import { SimpleUser } from "./types";

export const getUsers = async (): Promise<Array<SimpleUser> | []> => {
  const querySnapshot = await firestore().collection('users').get();

  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  }))
}

export const createUser = async (userId: string, name: string, phoneNumber: string): Promise<void> => {
  await firestore().collection('users').doc(userId).set({
    name,
    phoneNumber,
    contacts: [],
  });
}

export const addContactToUser = async (userId: string, newContactId: string): Promise<void> => {
  const user = await firestore().collection('users').doc(userId).get();
  const userData: SimpleUser = user.data();

  await firestore().collection('users').doc(userId).update({
    contacts: [...userData.contacts, newContactId]
  });
}
