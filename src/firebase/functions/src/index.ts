import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Message } from "../../firestore/messages/types";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import DocumentData = FirebaseFirestoreTypes.DocumentData;
import { messaging } from "firebase-admin";
import TokenMessage = messaging.TokenMessage;
admin.initializeApp();

export const sendListenerPushNotification = functions.database.ref('/messages/{messageId}/').onWrite(
  async (data, context) => {
    const messageId: string = context.params.messageId;

    const message = await admin.firestore().collection(`messages`).doc(messageId).get();
    const messageData: DocumentData | Message | undefined = message.data();

    if (!messageData) {
      return { error: 'Something went wrong' };
    }

    const FCMToken = await admin.firestore().collection(`fcmtokens`).doc(messageData.to).get();
    const FCMTokenData = FCMToken.data();

    const notificationPayload: TokenMessage = {
      token: FCMTokenData?.token,
      notification: {
        title: 'You have new message',
        body: messageData.content,
      },
      data: {
        body: messageData.content,
      }
    };

    try {
      const sentMessage = await admin.messaging().send(notificationPayload);
      console.log('message has been successfully sent', sentMessage);
      return { success: true };
    } catch (e) {
      return { error: e };
    }
  }
);

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
