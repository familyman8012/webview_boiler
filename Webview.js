import React, {useState, useRef, useCallback, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet, BackHandler, Alert, PermissionsAndroid} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';

// const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-5419852983818824/4053895469';

function HomeScreen() {
  const webview = useRef(null);
  const [canGoBack, SetCanGoBack] = useState(false);

  //

  useEffect(() => {
    PushNotification.subscribeToTopic('fcpush');
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        // axios({
        //   method: 'post',
        //   url:
        //     'https://www.easy-mon.com/back/member/tokenSave.php?_=' +
        //     new Date().getTime(),
        //   data: {
        //     mb_id: mb_id,
        //     token: token.token,
        //   },
        // })
        //   .then(function (response) {
        //     console.log(response.data);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        // console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        Alert.alert(notification.title, notification.message);
        console.log(notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        //notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (webview.current && canGoBack) {
          webview.current.goBack();
          return true;
        } else {
          return false;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [canGoBack]),
  );
  return (
    <>
      <WebView
        ref={webview}
        source={{uri: 'https://store.gopizza.kr/home'}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        sharedCookiesEnabled={true}
        originWhitelist={['*']}
        scalesPageToFit={true}
        mixedContentMode={'always'}
        allowsInlineMediaPlayback={true}
        allowsFullscreenVideo={true}
        allowsBackForwardNavigationGestures={true}
        allowsLinkPreview={false}
        style={{width: '100%', height: '100%'}}
        startInLoadingState={true}
        onNavigationStateChange={navState => {
          SetCanGoBack(navState.canGoBack);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default HomeScreen;
