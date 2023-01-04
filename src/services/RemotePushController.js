import {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import {Alert} from 'react-native';

const RemotePushController = () => {
  useEffect(() => {
    PushNotification.subscribeToTopic('fcpush');
    PushNotification.configure({
      onRegister: token => {
        console.log('Token', token);
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
        Alert.alert(notification.title, notification.message);
        // process the action
      },
      onNotification: notification => {
        Alert.alert(notification.title, notification.message);
      },
      playSound: true,
      soundName: 'default',
      importance: 10,
      vibrate: true,
      vibration: 1000,
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);
  return null;
};

export default RemotePushController;
