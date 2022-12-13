import firestore from "@react-native-firebase/firestore";

export const getToken = async (userId: string) => {
  const token = await firestore().collection('fcmtokens').doc(userId).get();

  if (!token) {
    return;
  }

  return {
    ...token.data(),
    userId,
  };
}

export const addToken = async (userId: string, token: string): Promise<void> => {
  await firestore().collection('fcmtokens').doc(userId).set({
    token,
  });
}
