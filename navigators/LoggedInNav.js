import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import TabIcon from '../components/nav/TabIcon';
import SharedStackNav from './SharedStackNav';

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        // 활성화된(선택된) 메뉴의 색
        activeTintColor: 'white',
        // 글씨 안보이게(아이콘만 보임)
        showLabel: false,
        // 윗선색과 배경색 지정
        style: {
          borderTopColor: 'rgba(255, 255, 255, 0.3)',
          backgroundColor: 'black',
        },
      }}
    >
      <Tabs.Screen
        name="Feed"
        options={{
          // tabNav의 ActiveTintColor색을 물려받음
          // focused는 현재 선택된 상태인가 아닌가를 알려줌
          // size는 font size
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'home'} color={color} focused={focused} />
          ),
        }}
      >
        {/* stack navigation을 안에서 또 따로 구현하기위해 만들어진 컴포넌트 */}
        {() => <SharedStackNav screenName="Feed" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'search'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>
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
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'heart'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Notifications" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Me"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'person'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
