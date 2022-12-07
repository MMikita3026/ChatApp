import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Root from "./src/navigation/Root";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "./src/providers/UserProvider";

const App = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <SafeAreaProvider>
          <Root />
        </SafeAreaProvider>
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
