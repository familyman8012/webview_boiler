import React, {useState, useRef, useCallback, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import {
  StyleSheet,
  BackHandler,
  Alert,
  PermissionsAndroid,
  Text,
  TextInput,
  StatusBar,
  Modal,
  Pressable,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {
  requestUserPermission,
  NotificationListner,
} from './src/utils/pushnotification_helper';

function HomeScreen() {
  const webview = useRef(null);
  const [canGoBack, SetCanGoBack] = useState(false);

  useEffect(() => {
    requestUserPermission();
    NotificationListner();
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
      <StatusBar hidden={true} />
      <WebView
        ref={webview}
        source={{
          uri: `https://store.gopizza.kr/home`,
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        sharedCookiesEnabled={true}
        originWhitelist={['*']}
        scalesPageToFit={true}
        mixedContentMode={'always'}
        allowsInlineMediaPlayback={true}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    // position: 'absolute',
    // top: 0,
  },
  modalView: {
    margin: 20,
    width: 500,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: 400,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
  },
  button: {
    width: 300,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default HomeScreen;
