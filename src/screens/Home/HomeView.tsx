import React from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import SignOut from "../../components/Buttons/SignOut";
import AddContact from "../../components/Buttons/AddContact";
import { SimpleUser } from "../../firebase/firestore/users/types";
import ContactItem from "./components/ContactItem";

type HomeViewPropsType = {
  onSignOut: () => void;
  onAddContact: (contactId: string) => void;
  contacts: Array<SimpleUser> | [];
  onContactPress: (contactId: string) => void;
}

const HomeView: React.FC<HomeViewPropsType> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.oneThirdHeader}>
              <AddContact onPress={props.onAddContact} />
            </View>
            <View style={styles.oneThirdHeader} />
            <View style={styles.oneThirdHeader}>
              <SignOut title="SignOut" onPress={props.onSignOut} />
            </View>
          </View>
        }
        data={props.contacts}
        keyExtractor={(item: SimpleUser) => item.id}
        renderItem={(({item}) => <ContactItem item={item} onPress={props.onContactPress} />)}
      />
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
