import firestore from '@react-native-firebase/firestore';
import { SimpleUser } from "./types";

export const getUsers = async (): Promise<Array<SimpleUser> | []> => {
  const querySnapshot = await firestore().collection('users').get();

  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  }))
}

export const getUser = async (userId: string): Promise<SimpleUser> => {
  const user = await firestore().collection('users').doc(userId).get();
  return {
    ...user.data(),
    id: userId,
  };
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

  if (userData.contacts.includes(newContactId)) {
    return;
  }

  await firestore().collection('users').doc(userId).update({
    contacts: [...userData.contacts, newContactId]
  });
}

export const subscribeToUserDataChange = (userId: string, callback: (newData: SimpleUser) => void): () => void => {
  return firestore().collection('users').doc(userId).onSnapshot(async (documentSnapshot) => {
    const newData: SimpleUser = documentSnapshot.data();
    const fullContactsInfo = await Promise.all(newData.contacts.map(async (contactId: SimpleUser["id"]) => await getUser(contactId)));

    callback({ ...newData, contacts: fullContactsInfo });
  });
}
