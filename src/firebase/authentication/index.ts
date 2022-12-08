import auth from '@react-native-firebase/auth';

export const signUpUserWithEmailAndPassword = async (email: string, password: string) => {
  const data = await auth().createUserWithEmailAndPassword(email, password);
  return data?.user;
}

export const signOut = async () => {
  await auth().signOut();
}

export const signInUserWithEmailAndPassword = async (email: string, password: string) => {
  await auth().signInWithEmailAndPassword(email, password);
}
