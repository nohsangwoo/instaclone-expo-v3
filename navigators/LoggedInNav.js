import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from '../screens/Feed';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
import { View } from 'react-native';
import TabIcon from '../components/nav/TabIcon';

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        // 클릭한 tab네비게이션이
        activeTintColor: 'white',
        showLabel: false,
        style: {
          // tabNavigation의 상단부분의 선을 투명하게 만들어줌
          borderTopColor: 'rgba(255, 255, 255, 0.3)',
          backgroundColor: 'black',
        },
      }}
    >
      <Tabs.Screen
        name="Feed"
        component={Feed}
        options={{
          // 이 props의 color는 activeTintColor랑 같음
          // focused는 현재 해당 route가 활성화된 상태인가 아닌가를 boolean으로 표시함
          tabBarIcon: ({ focused, color, size }) => (
            // 해당 탭의 화면이 활성화된 상태라면 icon의 크기가 24로되고 평소엔 20의 크기
            <TabIcon iconName={'home'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'search'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Camera"
        component={View}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'camera'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'heart'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'person'} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
