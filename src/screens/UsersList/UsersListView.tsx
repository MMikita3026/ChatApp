import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, ActivityIndicator, FlatList } from "react-native";
import Back from "../../components/Buttons/Back";
import UserItem from "./components/UserItem";
import { SimpleUser } from "../../firebase/firestore/users/types";
import SpinnerOverlay from "../../components/SpinnerOverlay";

type UsersListViewPropsType = {
  isLoading: boolean;
  isContactAdding: boolean;
  users: Array<SimpleUser> | [];
  onAddContact: (contactId: string) => void;
}

const UsersListView: React.FC<UsersListViewPropsType> = (props) => {
  return (
    <>
      {props.isContactAdding && <SpinnerOverlay />}
      <SafeAreaView style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.header}>
              <View style={styles.oneSevens}>
                <Back />
              </View>
              <View style={styles.fifthSevens}>
                <Text style={styles.headerText}>List Of Users</Text>
              </View>
              <View style={styles.oneSevens} />
            </View>
          }
          data={props.users}
          renderItem={({item}) => <UserItem item={item} onPress={props.onAddContact} />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={props.isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator />
            </View>
          ) : null}
        />
        <View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#404040',
    alignItems: 'center',
    paddingVertical: 8,
    flexDirection: 'row',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 34,
    fontFamily: "SakkalMajalla",
  },
  oneSevens: {
    flex: 1,
  },
  fifthSevens: {
    flex: 5,
    alignItems: 'center',
  },
  loadingContainer: {
    paddingTop: 12,
  }
});

export default UsersListView;
