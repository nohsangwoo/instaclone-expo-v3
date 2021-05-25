import React, { useRef } from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';

import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';

export default function CreateAccount() {
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = nextOne => {
    nextOne?.current?.focus();
  };
  const onDone = () => {
    alert('done!');
  };
  return (
    <AuthLayout>
      <TextInput
        name
        placeholder="First Name"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{ backgroundColor: 'white', width: '100%' }}
        // 각각의 enter버튼을 눌렀을때 작동하는 기능
        onSubmitEditing={() => onNext(lastNameRef)}
      />
      <TextInput
        ref={lastNameRef}
        placeholder="Last Name"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{ backgroundColor: 'white', width: '100%' }}
        onSubmitEditing={() => onNext(usernameRef)}
      />
      <TextInput
        ref={usernameRef}
        placeholder="Username"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{ backgroundColor: 'white', width: '100%' }}
        onSubmitEditing={() => onNext(emailRef)}
      />
      <TextInput
        ref={emailRef}
        placeholder="Email"
        placeholderTextColor="gray"
        // 입력시 나타나는 키보드의 종류를 선택해준다
        // 어떤 키보드는 .이 없다던지, 특수문자가 없는 키보드가 나타난다던지 등등
        // 여기선 이메일을 입력하기 최적의 상태인 키보드 종류를 불러온다
        keyboardType="email-address"
        // 키보드에서 표시되는 return 입력 버튼이 무엇으로 보이는지 선택가능
        returnKeyType="next"
        style={{ backgroundColor: 'white', width: '100%' }}
        onSubmitEditing={() => onNext(passwordRef)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor="gray"
        // 비밀번호를 가려주고 첫글자가 대문자로 시작되는걸 막아줌
        secureTextEntry
        returnKeyType="done"
        style={{ backgroundColor: 'white', width: '100%' }}
        onSubmitEditing={onDone}
      />
      <AuthButton text="Create Account" disabled={true} onPress={() => null} />
    </AuthLayout>
  );
}
