import messaging, { firebase } from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
// import { navigate } from "./MyNavigator"; // Import your custom navigator

class FCMNotificationService {
  async updateFCMToken() {
    const authorizationStatus = await messaging().requestPermission();
    console.log("authorizationStatus " + authorizationStatus);
    await firebase.messaging().registerDeviceForRemoteMessages();

    if (authorizationStatus) {
      const fcmToken = await messaging().getToken();
      console.log("FCM TOKEN:", fcmToken);
      console.log("Firebase Instance Id:", fcmToken?.split(":")[0]);

      // Send the FCM token to your server using your API
      //   await this.fcmTokenApi(fcmToken);
    }
  }

  async clearFCMToken() {
    await messaging().deleteToken();
  }

  async initNotification() {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        try {
          const payload = JSON.parse(notification.data || "{}");
          FCMNotificationService.onNotificationClicked(
            payload,
            "PushNotification"
          );
        } catch (error) {
          console.error("Error processing notification response:", error);
        }
      },
      requestPermissions: Platform.OS === "ios",
    });
  }

  static async onNotificationClicked(payload, path) {
    console.log(
      `------------------- called from || ${path} -------------------`
    );
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

    console.log("payload data:", payload);

    if (payload.route) {
      navigate(payload.route, { data: payload });
    } else {
      navigate("SplashScreen");
    }
  }

  fcmListener() {
    messaging().onMessage(async (remoteMessage) => {
      console.log("Notification received", remoteMessage);
      FCMNotificationService.createNotification(remoteMessage);
    });
  }

  static async createNotification(remoteMessage) {
    try {
      PushNotification.localNotification({
        channelId: "pushNotification",
        largeIcon: "@mipmap/ic_launcher", 
        smallIcon: "@mipmap/ic_launcher",
        color: "#6949ff", 
        importance: "high",

        /* iOS and Android properties */
        title: remoteMessage.notification?.title,
        message: remoteMessage.notification?.body,
        userInfo: remoteMessage.data, // Payload data
      });
      // PushNotification.createChannel(
      //   {
      //     channelId: "pushNotification", // same as the channelId used in localNotification
      //     channelName: "Push Notifications", // Name of the channel
      //     importance: 4, // Importance level (4 is high, 5 is max)
      //     vibrate: true, // Optional - default: true
      //   },
      //   (created) => console.log(`CreateChannel returned '${created}'`) // callback if channel was created, true for created, false for already existed
      // );
    } catch (error) {
      console.error("Notification Create Error:", error);
    }
  }

 
}

export default FCMNotificationService; 
