import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { isLoggedInVar, logUserIn } from '../apollo';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

// 전달받은 props사용방법
export default function Login({ route: params }) {
  // console.log(route);
  const { register, handleSubmit, setValue, watch } = useForm({
    // hook form에서 기본값으로 지정
    defaultValues: {
      password: params?.params?.password,
      username: params?.params?.username,
    },
  });

  const usernameRef = useRef();
  const passwordRef = useRef();

  const onCompleted = async data => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await logUserIn(token);
    }
  };

  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onNext = nextOne => {
    nextOne?.current?.focus();
  };

  const onValid = data => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  // 맨처음 가상의 공간에 input값을 register로 설정한다음
  // 입력되는 input창에서 setValue를 onChangeText가 될때마다 저장해주는 방식으로 사용
  useEffect(() => {
    register('username', {
      required: true,
    });
    register('password', {
      required: true,
    });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        ref={usernameRef}
        // default value를 적용 시키기 위한 작업
        value={watch('username')}
        placeholder="Username"
        returnKeyType="next"
        autoCapitalize="none"
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={text => setValue('username', text)}
      />
      <TextInput
        // default value를 적용 시키기 위한 작업
        value={watch('password')}
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
        loading={loading}
        // watch로 실시간 체크하여 username부분과 password부분의 Input value가 빈칸이라면 submit버튼을 비활성화 시킨다
        disabled={!watch('username') || !watch('password')}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
