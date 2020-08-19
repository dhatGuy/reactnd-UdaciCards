import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { AsyncStorage } from "react-native";

const NOTIFICATION_KEY = "flashcard:notification";

// const msgs = ["Don't"]
export const cancelAllNotifications = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync()
  );
};

export const setNotification = async () => {
  await AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.getAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();
            let tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          tomorrow.setHours(20)
          tomorrow.setMinutes(0)
            Notifications.scheduleNotificationAsync({
              content: {
                title: "Practice",
                body: "👋 Don't forget to practice today!😉",
                ios: {
                  sound: true,
                },
                android: {
                  sound: true,
                  priority: "high",
                  sticky: false,
                  vibrate: true,
                },
              },
              trigger:{
                time: tomorrow,
                repeats: "day"
              }
            });
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
};
