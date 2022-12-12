import firestore from '@react-native-firebase/firestore';
import { Message } from "./types";

export const getMessages = async (userId: string, interlocutorId: string) => {
  const querySnapshot = await firestore()
    .collection('messages')
    .where('from', 'in', [userId, interlocutorId])
    .orderBy('creationDate', 'asc')
    .get();

  return querySnapshot.docs
    .filter(doc => [userId, interlocutorId].includes(doc.data().to))
    .map(doc => ({
    ...doc.data(),
    id: doc.id,
  }))
}

export const subscribeToMessages = (userId: string, interlocutorId: string, callback: (messages: Array<Message> | []) => void): () => void => {
  const onChange = (querySnapshot) => {
    const data: Array<Message> | [] = [];

    querySnapshot.forEach(documentSnapshot => {
      data.push({
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
      });
    });

    const filteredData = data.filter(item => [userId, interlocutorId].includes(item.to))

    callback(filteredData);
  }


  return firestore()
    .collection('messages')
    .where('from', 'in', [userId, interlocutorId])
    .orderBy('creationDate', 'asc')
    .onSnapshot(onChange)
}

export const addMessage = async (fromUser: string, toUser: string, content: string) => {
  await firestore().collection('messages').add({
    from: fromUser,
    to: toUser,
    content,
    creationDate: Date.now(),
  });
}
