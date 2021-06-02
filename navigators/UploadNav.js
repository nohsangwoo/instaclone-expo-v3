import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SelectPhoto from '../screens/SelectPhoto';
import TakePhoto from '../screens/TakePhoto';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function UploadNav() {
  return (
    <Tab.Navigator
      // 네비게이터의 위치를 하단에 고정(원래는 상단에 있음)
      tabBarPosition="bottom"
      tabBarOptions={{
        style: {
          backgroundColor: 'black',
        },
        activeTintColor: 'white',
        // 네비메뉴 선택시 하단에 따라다니는 선
        indicatorStyle: {
          backgroundColor: 'white',
          top: 0,
        },
      }}
    >
      <Tab.Screen name="Select">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: 'white',
              //  뒤로가기 버튼 옆에있는 글씨 안보이게 설정
              headerBackTitleVisible: false,
              // 뒤로가기 버튼 모양을 다른 이미지로 교체해주는 옵션이고 tintColor를 인자로 받음
              headerBackImage: ({ tintColor }) => (
                <Ionicons color={tintColor} name="close" size={28} />
              ),
              headerStyle: {
                backgroundColor: 'black',
                shadowOpacity: 0.3,
              },
            }}
          >
            <Stack.Screen
              name="Select"
              options={{ title: 'Choose a photo' }}
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  );
}
