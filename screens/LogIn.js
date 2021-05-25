import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';

export default function Login() {
  const { register, handleSubmit, setValue } = useForm();
  const passwordRef = useRef();
  const onNext = nextOne => {
    nextOne?.current?.focus();
  };
  const onValid = data => {
    console.log(data);
  };

  // 맨처음 가상의 공간에 input값을 register로 설정한다음
  // 입력되는 input창에서 setValue를 onChangeText가 될때마다 저장해주는 방식으로 사용
  useEffect(() => {
    register('username');
    register('password');
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        placeholder="Username"
        returnKeyType="next"
        autoCapitalize="none"
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={text => setValue('username', text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={text => setValue('password', text)}
      />
      <AuthButton
        text="Log In"
        disabled={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
