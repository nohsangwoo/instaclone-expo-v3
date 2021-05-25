import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import LogIn from '../screens/LogIn';
import CreateAccount from '../screens/CreateAccount';

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{ headerBackTitleVisible: false }}
    >
      <Stack.Screen
        name="Welcome"
        options={{
          headerShown: false,
        }}
        component={Welcome}
      />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen
        options={{
          // header 부분 title을 없앤다
          headerTitle: false,
          // header가 있지만 보이지만 않게 해주는 기능
          headerTransparent: true,
          // header의 색을 하얀색으로 변경(배경색 아님)
          headerTintColor: 'white',
        }}
        name="CreateAccount"
        component={CreateAccount}
      />
    </Stack.Navigator>
  );
}
