import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { FlatList, KeyboardAvoidingView } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import styled from 'styled-components/native';

const MessageContainer = styled.View``;
const Author = styled.View``;
const Avatar = styled.Image``;
const Username = styled.Text`
  color: white;
`;
const Message = styled.Text`
  color: white;
`;
const TextInput = styled.TextInput`
  margin-bottom: 50px;
  width: 95%;
  background-color: white;
  padding: 10px 20px;
  border-radius: 1000px;
`;

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      messages {
        id
        payload
        user {
          username
          avatar
        }
        read
      }
    }
  }
`;

export default function Room({ route, navigation }) {
  const { data, loading } = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.username}`,
    });
  }, []);

  const renderItem = ({ item: message }) => (
    <MessageContainer>
      <Author>
        <Avatar source={{ uri: message.user.avatar }} />
        <Username>{message.user.username}</Username>
      </Author>
      <Message>{message.payload}</Message>
    </MessageContainer>
  );

  return (
    //   키보드가 나타날때 화면이 같이 올라가서 키보드가 화면을 가려버리지 않도록 해줌
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'black' }}
      behavior="height"
      //   margin 같은 개념
      keyboardVerticalOffset={100}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          // inverted옵션으로 맨 아래가 가장 최신의 데이터가 오도록 만듬
          // 채팅에선 맨 아래 텍스트가 가장 최신 메시지로 로드함
          inverted
          style={{ width: '100%' }}
          data={data?.seeRoom?.messages}
          keyExtractor={message => '' + message.id}
          renderItem={renderItem}
        />
        <TextInput
          placeholder="Write a message..."
          //   for android
          returnKeyLabel="Send Message"
          //for ios
          returnKeyType="send"
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
