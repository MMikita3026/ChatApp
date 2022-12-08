import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SimpleUser } from "../../../firebase/firestore/users/types";
import AddContact from "../../../components/Buttons/AddContact";

type UserItemPropsType = {
  item: SimpleUser;
  onPress: (contactId: string) => void;
}

const UserItem: React.FC<UserItemPropsType> = (props) => {
  const handlePress = () => {
    props.onPress(props.item.id);
  }

  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <Text style={styles.text}>
          {props.item.name}
        </Text>
      </View>

      <View>
        <Text style={styles.text}>
          {props.item.phoneNumber}
        </Text>
      </View>

      <View>
        <AddContact onPress={handlePress} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: .75,
    borderBottomColor: '#404040',
  },
  text: {
    fontFamily: "SakkalMajalla",
    fontSize: 24,
  }
});

export default UserItem;
