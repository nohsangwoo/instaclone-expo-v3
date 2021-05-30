import React from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

export default function DismissKeyboard({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    //   이부분을 클릭하면 키보드입력창이 비활성화 되게 설정
    // dismissKeyboard이 클릭시 작동하는 함수(키보드창이 비활성화 되는 함수)
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      //   다만 기기환경이 웹인경우는 TouchableWithoutFeedback 기능을 비활성화 시킴
      disabled={Platform.OS === 'web'}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}
