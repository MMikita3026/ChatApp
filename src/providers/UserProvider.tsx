import React, { useContext } from "react";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";

export interface AuthenticatedUser {
  displayName: string | null;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {
    creationTime: number;
    lastSignInTime: number;
  },
  multiFactor: {
    enrolledFactors: Array<any> | [];
  },
  phoneNumber: number | null;
  photoURL: string | null;
  providerData: { [key: string]: any };
  providerId: string;
  refreshToken: string;
  tenantId: string | null;
  uid: string;
}

interface Session {
  loading: boolean;
  user: AuthenticatedUser | null;
}

export const UserContext = React.createContext(null);

export const UserProvider = (props) => {
  const [session, setSession] = useState<Session>({ loading: true, user: null });

  const onAuthStateChanged = (user: AuthenticatedUser | null) => {
    setSession({ user, loading: false });
  }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
    return unsubscribe;
  }, [])

  return (
    <UserContext.Provider value={session}>
      {!session.loading && props.children}
    </UserContext.Provider>
  )
}

export const useSession = () => {
  const session = useContext(UserContext);
  return session;
}
