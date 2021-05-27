import React, { useEffect, useRef } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';

// createAccount 트리거 생성
const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }) {
  const { register, handleSubmit, setValue, getValues } = useForm();

  // createAccount mutation이 성공했을때 실행되는 작업
  // mutation 성공시 LogIn Route로 이동
  const onCompleted = data => {
    const {
      createAccount: { ok },
    } = data;

    // from에서 submit한 시점에서 전달된 inputvalue
    const { username, password } = getValues();
    if (ok) {
      // LogIn route로 이동시 props를 함께 전달
      navigation.navigate('LogIn', {
        username,
        password,
      });
    }
  };

  // createAccount mutation hook 생성
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    // mutation쿼리가 실행된 이후 작동
    {
      // mutation이 성공했을때 실행되는 작업
      onCompleted,
    }
  );

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = nextOne => {
    nextOne?.current?.focus();
  };

  const onValid = data => {
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  useEffect(() => {
    register('firstName', {
      required: true,
    });
    register('lastName', {
      required: true,
    });
    register('username', {
      required: true,
    });
    register('email', {
      required: true,
    });
    register('password', {
      required: true,
    });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        ref={firstNameRef}
        placeholder="First Name"
        returnKeyType="next"
        // return 위치에 있는 버튼을 클릭시 실행될 동작
        onSubmitEditing={() => onNext(lastNameRef)}
        // 말 그대로 placeholder의 색
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        onChangeText={text => setValue('firstName', text)}
        // 자동으로 대문자 만들어주는 기능 끄기
        autoCapitalize={'none'}
      />
      <TextInput
        ref={lastNameRef}
        placeholder="Last Name"
        returnKeyType="next"
        onSubmitEditing={() => onNext(usernameRef)}
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        onChangeText={text => setValue('lastName', text)}
        autoCapitalize={'none'}
      />
      <TextInput
        ref={usernameRef}
        placeholder="Username"
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        onChangeText={text => setValue('username', text)}
        autoCapitalize={'none'}
      />
      <TextInput
        ref={emailRef}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        onChangeText={text => setValue('email', text)}
        autoCapitalize={'none'}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        onChangeText={text => setValue('password', text)}
        onSubmitEditing={handleSubmit(onValid)}
      />
      <AuthButton
        text="Create Account"
        disabled={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
