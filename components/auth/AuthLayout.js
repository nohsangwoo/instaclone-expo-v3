import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0px 20px;
`;

const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
`;

export default function AuthLayout({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    // TouchableWithoutFeedback 버그 우회
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      // 바깥쪽을 클릭한다면 키보드가 사라지게 설정
      onPress={dismissKeyboard}
      // 키보드가 사라지는 기능(정확히 말하면 TouchableWithoutFeedback의 기능)을 WEB에선 버그때문에 해제해준다
      disabled={Platform.OS === 'WEB'}
    >
      <Container>
        <KeyboardAvoidingView
          style={{
            width: '100%',
          }}
          behavior="position"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
        >
          <Logo
            resizeMode="contain"
            source={require('../../assets/logo.png')}
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
