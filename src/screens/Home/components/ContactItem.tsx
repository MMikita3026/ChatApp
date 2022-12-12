import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SimpleUser } from "../../../firebase/firestore/users/types";

type ContactItemPropsType = {
  item: SimpleUser;
  onPress: (contactId: string) => void;
}

const ContactItem: React.FC<ContactItemPropsType> = (props) => {
  console.log(props.item);
  return (
    <TouchableOpacity style={styles.container} onPress={() => props.onPress(props.item.id)}>
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: '#404040',
    borderTopWidth: .75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    fontFamily: "SakkalMajalla",
    fontSize: 24,
  }
});

export default ContactItem;
