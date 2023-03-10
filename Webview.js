import React, {useState, useRef, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet, BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import RemotePushController from './src/services/RemotePushController';

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
      <RemotePushController />
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
