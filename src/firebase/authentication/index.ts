import auth from '@react-native-firebase/auth';

export const signUpUserWithEmailAndPassword = async (email: string, password: string) => {
  await auth().createUserWithEmailAndPassword(email, password);
}

export const signOut = async () => {
  await auth().signOut();
}

export const signInUserWithEmailAndPassword = async (email: string, password: string) => {
  await auth().signInWithEmailAndPassword(email, password);
}
