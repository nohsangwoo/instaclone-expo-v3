import React from 'react';
import { Text, View } from 'react-native';
import { logUserOut } from '../apollo';

export default function Notifications() {
  const onClcikNoti = () => {
    console.log('임시 로그아웃 기능');
    logUserOut();
  };
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text onPress={onClcikNoti} style={{ color: 'white' }}>
        Notifications
      </Text>
    </View>
  );
}
