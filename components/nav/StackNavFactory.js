import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Photo from '../../screens/Photo';
import Profile from '../../screens/Profile';
import Feed from '../../screens/Feed';
import Search from '../../screens/Search';
import Notifications from '../../screens/Notifications';
import Me from '../../screens/Me';

const Stack = createStackNavigator();

export default function StackNavFactory({ screenName }) {
  const chooseScreen = screenName => {
    switch (screenName) {
      case 'Feed':
        return <Stack.Screen name={'Feed'} component={Feed} />;
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
    <Stack.Navigator>
      {screenName === 'Feed' ? (
        <Stack.Screen name={'Feed'} component={Feed} />
      ) : null}
      {screenName === 'Search' ? (
        <Stack.Screen name={'Search'} component={Search} />
      ) : null}
      {screenName === 'Notifications' ? (
        <Stack.Screen name={'Notifications'} component={Notifications} />
      ) : null}
      {screenName === 'Me' ? <Stack.Screen name={'Me'} component={Me} /> : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
    </Stack.Navigator>
  );
}
