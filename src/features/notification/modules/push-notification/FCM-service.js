import messaging from '@react-native-firebase/messaging'
import { Platform } from 'react-native'

class FCMService {
  // we use this method to register notification service in our app.
  // we call this method in componetDidMount() so, we app load we get permission to
  // display notification.
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister)
    // when register function call that time we create notification listener
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    )
  }

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages()
      await messaging().setAutoInitEnabled()
    }
  }

  checkPermission = (onRegister) => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          //user has permission
          this.getToken(onRegister)
        } else {
          //user don't have permission
          this.requestPermission(onRegister)
        }
      })
      .catch((error) => {
        console.log('Permission rejected', error)
      })
  }

  getToken = (onRegister) => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          console.log(`fcmToken`, fcmToken)
          onRegister(fcmToken)
        } else {
          console.log('User does not have a device token')
        }
      })
      .catch((error) => {
        console.log('getToken rejected ', error)
      })
  }

  requestPermission = (onRegister) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister)
      })
      .catch((error) => {
        console.log('Requested persmission rejected ', error)
      })
  }

  deletedToken = () => {
    messaging()
      .deleteToken()
      .catch((error) => {
        console.log('Delected token error ', error)
      })
  }

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    // // This listener triggered when notification has been received in foreground
    // this.notificationListener = firebase
    //   .notifications()
    //   .onNotification((notification) => {
    //     onNotification(notification)
    //   })

    // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
    messaging().onNotificationOpenedApp((notificationOpen) => {
      console.log('notificationOpen 1: ', notificationOpen)
      if (notificationOpen) {
        const notification = notificationOpen.notification
        onOpenNotification(notification)
        // this.removeDeliveredNotification(notification)
      }
    })

    // This listener triggered when app is closed and we click,tapped and opened notification
    messaging()
      .getInitialNotification()
      .then((notificationOpen) => {
        console.log(`notificationOpen 2: `, notificationOpen)
        if (notificationOpen) {
          const notification = notificationOpen.notification
          onOpenNotification(notification)
          // this.removeDeliveredNotification(notification)
        }
      })

    // Triggered for data only payload  in foreground
    this.messageListener = messaging().onMessage((message) => {
      console.log(`message`, message)
      if (message) {
        let notification = null
        if (Platform.OS === 'ios') {
          notification = { ...message.data.notification, ...message.data.data }
        } else {
          notification = { ...message.notification, ...message.data }
        }

        onNotification(notification)
      }
    })

    // This listener triggered when new token
    messaging().onTokenRefresh((fcmToken) => {
      console.log('FCM new token: ', fcmToken)
      onRegister(fcmToken)
    })
  }

  unRegister = () => {
    this.messageListener()
  }

  // buildChannel = (obj) => {
  //   return new firebase.notifications.Android.Channel(
  //     obj.channelId,
  //     obj.channelName,
  //     firebase.notifications.Android.Importance.High,
  //   ).setDescription(obj.channelDes)
  // }

  // buildNotification = (obj) => {
  //   console.log(obj)
  //   firebase.notifications().android.createChannel(obj.channel)

  //   const notification = new firebase.notifications.Notification()
  //     .setSound(obj.sound)
  //     .setNotificationId(obj.dataId)
  //     .setTitle(obj.title)
  //     .setBody(obj.content)
  //     .setData(obj.data)
  //     .android.setChannelId(obj.channel.channelId)
  //     .android.setLargeIcon(obj.largeIcon)
  //     .android.setSmallIcon(obj.smallIcon)
  //     .android.setColor(obj.colorBgIcon)
  //     .android.setPriority(firebase.notifications.Android.Priority.High)
  //     .android.setVibrate(obj.vibrate)
  //     .android.setAutoCancel(true)

  //   return notification
  // }

  // scheduleNotification = (notification, datetime) => {
  //   const date = new Date(datetime)
  //   firebase
  //     .notifications()
  //     .scheduleNotification(notification, { fireDate: date.getTime() })
  // }

  // displayNotification = (notification) => {
  //   firebase
  //     .notifications()
  //     .displayNotification(notification)
  //     .catch((error) => {
  //       console.log('Display Notification error', error)
  //     })
  // }

  // removeDeliveredNotification = (notification) => {
  //   firebase
  //     .notifications()
  //     .removeDeliveredNotification(notification.notificationId)
  // }
}
export const fcmService = new FCMService()
