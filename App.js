import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import LoggedOutNav from './navigators/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';
import { Appearance } from 'react-native';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import client, { isLoggedInVar, tokenVar,cache } from './apollo';
import LoggedInNav from './navigators/LoggedInNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageWrapper, persistCache } from "apollo3-cache-persist";


export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map(font => Font.loadAsync(font));
    const imagesToLoad = [require('./assets/logo.png')];
    const imagePromises = imagesToLoad.map(image => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };

  // 말그대로 앱이 실행? 작동하기전에 처리되는 부분
  const preload = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    // persist적용법
    // cache를 restore해주는 작업임
    // 즉 cache를 AsyncStorage로 보내주겠다는 의미
    await persistCache({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
    });
    return preloadAssets();
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  // console.log(Appearance.getColorScheme());
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
}
