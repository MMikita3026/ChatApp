import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import SignOut from "../../components/Buttons/SignOut";
import AddContact from "../../components/Buttons/AddContact";

type HomeViewPropsType = {
  onSignOut: () => void;
  onAddContact: (contactId: string) => void;
}

const HomeView: React.FC<HomeViewPropsType> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.oneThirdHeader}>
            <AddContact onPress={props.onAddContact} />
          </View>
          <View style={styles.oneThirdHeader} />
          <View style={styles.oneThirdHeader}>
            <SignOut title="SignOut" onPress={props.onSignOut} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
  },
  oneThirdHeader: {
    flex: 1,
  }
});

export default HomeView;
