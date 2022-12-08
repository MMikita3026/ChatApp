import React from 'react';
import { ActivityIndicator, StyleSheet, View } from "react-native";

const SpinnerOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
    zIndex: 3,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default SpinnerOverlay;
