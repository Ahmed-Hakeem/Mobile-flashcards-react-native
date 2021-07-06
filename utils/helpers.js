import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
const NOTIFICATIONS_KEY = "@MobileFlashCards:notifications";

export async function clearLocalNotification() {
  //remove from the storage and cancel all prev registered notification
  await AsyncStorage.removeItem(NOTIFICATIONS_KEY);
  console.log("removed");
  return await Notifications.cancelAllScheduledNotificationsAsync();
}

function createNotification() {
  return {
    title: "Study reminder !",
    body: "Reminder to take any quiz today !",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATIONS_KEY)
    .then((jsonData) => {
      return JSON.parse(jsonData);
    })
    .then((data) => {
      //check if we have registered the notification using the async storage
      if (data === null) {
        Permissions.getAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          console.log(status);
          // check if we have permission to push Notifications
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            //set a notification to be tomorrow at 20:30
            const Tomorrow = new Date();
            Tomorrow.setDate(Tomorrow.getDate() + 1);
            Tomorrow.setHours(20);
            Tomorrow.setMinutes(30);

            const Today = new Date();
            const Seconds = (Tomorrow.getTime() - Today.getTime()) / 1000;

            console.log(Seconds);
            //set notification after finishing exam
            Notifications.scheduleNotificationAsync({
              content: {
                ...createNotification(),
                title: "Reminder !",
                body: "Great , lets take another Quiz in the next 24 hours!",
              },
              trigger: {
                seconds: 30,
                // repeats:true
              },
            });

            //set notification every day at 20:30
            Notifications.scheduleNotificationAsync({
              content: {
                ...createNotification(),
              },
              trigger: {
                seconds: Seconds,
                repeats: true,
              },
            });

            AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
