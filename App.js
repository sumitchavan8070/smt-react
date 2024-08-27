import { useEffect } from "react";
import RouteNavigation from "./RouteNavigation";
import { NavigationContainer } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { GlobalRefreshProvider } from "./Context/GlobalRefreshContext";
import { requestUserPermission } from "./utils/constant/notificationService";

import { useColorScheme } from "react-native";
import { DefaultTheme } from "@react-navigation/native";
// import PushNotification from "react-native-push-notification";
import FCMNotificationService from './utils/firebase/FCMNotificationService'; // Adjust the path as needed


export default function App() {
  useEffect(() => {
    const unlockOrientation = async () => {
      await ScreenOrientation.unlockAllOrientations();
    };



    const fcmService = new FCMNotificationService();

    // Initialize FCM notifications
    fcmService.initNotification();

    // Update FCM Token
    fcmService.updateFCMToken();

    // Set up FCM listener
    fcmService.fcmListener();

    // CheckForUpdate();

    // const notificationService = new FCMNotificationService();
    // notificationService
    //   .updateFCMToken()
    //   .then(() => {
    //     console.log("FCM token updated successfully");
    //   })
    //   .catch((error) => {
    //     console.error("Failed to update FCM token:", error);
    //   });

    // PushNotification.createChannel(
    //   {
    //     channelId: "download-channel", // Unique channel ID
    //     channelName: "Download Notifications", // User-visible name of the channel
    //     channelDescription: "Notifications for file downloads", // Description of the channel
    //     importance: 4, // Importance level (4 = HIGH)
    //     vibrate: true, // Enable vibration
    //   },
    //   (created) => console.log(`Notification channel created: '${created}'`) // Callback to know if the channel was created
    // );

    return () => {
      unlockOrientation();
    };
  }, []);
  const scheme = useColorScheme();

  // Force light mode
  const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
      text: "black",
    },
  };

  // const CheckForUpdate = async () => {
  // const reponse = await axios.post("/app-update", {
  //   app_name: "meadhikari",
  //   app_type: "Android",
  // });

  // const reponse = {
  //   appId: "com.sc.meadhikari",
  //   softUpdate: 0,
  //   forceUpdate: 1,
  //   buildNo: 1,
  //   iosBuildNo: 102,
  //   version: "6.1.8",
  //   title: "Update Available",
  //   message:
  //     "A new version of the app is available. Please update to the latest version.",
  //   downloadUrl:
  //     "https://play.google.com/store/apps/details?id=com.globalassignmenthelp&hl=en",
  //   playIcon: "",
  // };

  // appUpdateFunction(reponse);
  // };

  // const lightTheme = {
  //   dark: false,
  //   colors: {
  //     primary: '#6200ee',
  //     background: '#ffffff',
  //     card: '#ffffff',
  //     text: '#000000',
  //     border: '#cccccc',
  //     notification: '#ff80ab',
  //   },
  // };

  // useEffect(() => {
  //   requestUserPermission();
  // }, []);

  return (
    <NavigationContainer theme={lightTheme}>
      {/* <CopilotProvider tooltipStyle={style}> */}
      <GlobalRefreshProvider>
        {/* <AppUpdateWrapper appUpdate={reponse}> */}
        <RouteNavigation></RouteNavigation>
        {/* </AppUpdateWrapper> */}
      </GlobalRefreshProvider>
      {/* </CopilotProvider> */}
    </NavigationContainer>
  );
}
