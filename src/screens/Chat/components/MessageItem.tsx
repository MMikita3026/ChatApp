import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Message } from "../../../firebase/firestore/messages/types";
import { useSession } from "../../../providers/UserProvider";

type MessageItemPropsType = {
  message: Message;
}

const MessageItem: React.FC<MessageItemPropsType> = (props) => {
  const { user: currentUser } = useSession();

  return (
    <View style={[styles.container, (currentUser.uid === props.message.from) && styles.messageAtRight]}>
      <Text style={styles.text}>{props.message.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    alignSelf: 'flex-start',
    backgroundColor: '#D0ECE8',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: 20,
  },
  text: {

  },
  messageAtRight: {
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 0,
    marginRight: 20,
  },
});

export default MessageItem;
