import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Photo from '../screens/Photo';
import Profile from '../screens/Profile';
import Feed from '../screens/Feed';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';
import Me from '../screens/Me';
import { Image } from 'react-native';

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  const chooseScreenAndRender = screenName => {
    switch (screenName) {
      case 'Feed':
        return (
          <Stack.Screen
            name={'Feed'}
            component={Feed}
            options={{
              // headerTitle꾸미는 방법
              headerTitle: () => (
                // headerTitle에 태그 넣는 방법
                <Image
                  style={{
                    width: 120,
                    height: 40,
                  }}
                  resizeMode="contain"
                  source={require('../assets/logo.png')}
                />
              ),
            }}
          />
        );
      case 'Search':
        return <Stack.Screen name={'Search'} component={Search} />;
      case 'Notifications':
        return (
          <Stack.Screen name={'Notifications'} component={Notifications} />
        );
      case 'Me':
        return <Stack.Screen name={'Me'} component={Me} />;
      default:
        return null;
    }
  };
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        headerStyle: {
          shadowColor: 'rgba(255, 255, 255, 0.3)',
          backgroundColor: 'black',
        },
      }}
    >
      {chooseScreenAndRender(screenName)}
      {/* {screenName === 'Feed' ? (
        <Stack.Screen name={'Feed'} component={Feed} />
      ) : null}
      {screenName === 'Search' ? (
        <Stack.Screen name={'Search'} component={Search} />
      ) : null}
      {screenName === 'Notifications' ? (
        <Stack.Screen name={'Notifications'} component={Notifications} />
      ) : null}
      {screenName === 'Me' ? <Stack.Screen name={'Me'} component={Me} /> : null} */}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
    </Stack.Navigator>
  );
}