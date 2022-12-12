import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Back from "../../components/Buttons/Back";
import { SimpleUser } from "../../firebase/firestore/users/types";
import { Message } from "../../firebase/firestore/messages/types";
import MessageItem from "./components/MessageItem";
import MessageInput from "./components/MessageInput";

type ChatViewPropsType = {
  interlocutor: SimpleUser;
  messages: Array<Message> | [];
  onMessageSend: (message: string) => void;
}

const ChatView: React.FC<ChatViewPropsType> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.oneSevens}>
              <Back isBlack />
            </View>
            <View style={styles.fifthSevens}>
              <Text style={styles.headerText}>{props.interlocutor.name}</Text>
              <Text style={styles.subheaderText}>{props.interlocutor.phoneNumber}</Text>
            </View>
            <View style={styles.oneSevens} />
          </View>
        }
        sickyHeaderIndices={[0]}

        data={props.messages}
        renderItem={({item}) => <MessageItem message={item} />}
        // ListEmptyComponent={props.isLoading ? (
        //   <View style={styles.loadingContainer}>
        //     <ActivityIndicator />
        //   </View>
        // ) : null}
      />
      <MessageInput onSend={props.onMessageSend} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 8,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  },
  headerText: {
    fontSize: 30,
    lineHeight: 30,
    fontFamily: "SakkalMajalla",
  },
  subheaderText: {
    fontSize: 18,
    lineHeight: 18,
    fontFamily: "SakkalMajalla",
  },
  oneSevens: {
    flex: 1,
  },
  fifthSevens: {
    flex: 5,
  },
});

export default ChatView;
