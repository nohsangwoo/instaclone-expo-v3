import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default function Login({ navigation }) {
  return (
    <View>
      <Text>Login</Text>
      {/* 이걸 누르면 navigation.navigate() 함수를 사용하여 해당 route로 이동하겠다 */}
      <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
        <Text>Go to Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}
