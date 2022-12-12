import React, { useEffect, useState } from "react";
import ChatView from "./ChatView";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/Main";
import { NavigationProp, useRoute } from "@react-navigation/native";
import { useSession } from "../../providers/UserProvider";
import { SimpleUser } from "../../firebase/firestore/users/types";
import { getUser } from "../../firebase/firestore/users";
import { addMessage, getMessages, subscribeToMessages } from "../../firebase/firestore/messages";
import { Message } from "../../firebase/firestore/messages/types";
import { LayoutAnimation } from "react-native";

type ChatPropsType = NativeStackScreenProps<MainStackParamList, 'Chat'>
type NavigationChatProp = NavigationProp<MainStackParamList, 'Chat'>

const Chat: React.FC<ChatPropsType> = () => {
  const { user: currentUser } = useSession();
  const route = useRoute<ChatPropsType["route"]>();
  const { params } = route;

  const [interlocutor, setInterlocutor] = useState<SimpleUser>({ id: '', contacts: [], name: '', phoneNumber: '' });
  const [messages, setMessages] = useState<Array<Message> | []>([]);

  const getInterlocutorInfo = async () => {
    try {
      const user = await getUser(params.interlocutorId);

      if (!user) {
        return;
      }

      setInterlocutor(user);
    } catch (e) {
      console.log('Error while loading interlocutor info', e);
    }
  }

  const handleMessagesChange = (messages: Array<Message> | []) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMessages(messages);
  }

  useEffect(() => {
    getInterlocutorInfo();

    const unsubscribe = subscribeToMessages(currentUser.uid, params.interlocutorId, handleMessagesChange);

    return () => unsubscribe();
  }, []);


  const handleMessageSend = async (message: string) => {
    try {
      await addMessage(currentUser.uid, params.interlocutorId, message);
    } catch (e) {
      console.log('Error while sending the message', e);
    }
  }

  return (
    <ChatView
      interlocutor={interlocutor}
      messages={messages}
      onMessageSend={handleMessageSend}
    />
  );
}

export default Chat;
