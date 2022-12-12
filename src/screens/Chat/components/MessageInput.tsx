import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Message } from "../../../firebase/firestore/messages/types";
import { Input } from "@rneui/themed";
import { Icon } from "@rneui/base";

type MessageInputPropsType = {
  message: Message;
  onSend: (message: string) => void;
}

const MessageInput: React.FC<MessageInputPropsType> = (props) => {
  const [message, setMessage] = useState<string>('');

  const handleSend = () => {
    props.onSend(message);
    setMessage('');
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Send message"
        inputContainerStyle={styles.inputContainerStyle}
        errorStyle={styles.errorStyle}
        rightIcon={
          <TouchableOpacity onPress={handleSend}>
            <Icon name="send" size={18} color="#C5BDBD" type="material" />
          </TouchableOpacity>
        }
        value={message}
        onChangeText={setMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    backgroundColor: '#ffffff',
    paddingTop: 6,
    paddingHorizontal: 2,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  errorStyle: {
    height: 0,
  }
});

export default MessageInput;
