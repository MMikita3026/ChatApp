import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Root from "./src/navigation/Root";

const App = () => {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};

export default App;
