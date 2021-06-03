import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { FlatList, KeyboardAvoidingView, View } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import styled from 'styled-components/native';
import { useForm } from 'react-hook-form';
import useMe from '../hooks/useMe';

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
    }
  }
`;

const MessageContainer = styled.View`
  padding: 0px 10px;
  /* 로그인한 사용자라면 왼쪽으로 상대방이라면 오른쪽에 표시된다 */
  flex-direction: ${props => (props.outGoing ? 'row-reverse' : 'row')};
  align-items: flex-end;
`;

const Author = styled.View``;

const Avatar = styled.Image`
  height: 20px;
  width: 20px;
  border-radius: 25px;
`;

const Message = styled.Text`
  color: white;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  overflow: hidden;
  border-radius: 10px;
  font-size: 16px;
  margin: 0px 10px;
`;

const TextInput = styled.TextInput`
  margin-bottom: 50px;
  margin-top: 25px;
  width: 95%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  color: white;
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
  const { data: meData } = useMe();
  const { register, setValue, handleSubmit, getValues } = useForm();
  const updateSendMessage = (cache, result) => {
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;

    // mutation이 성공했다는 의미이 ok반환값이랑
    // 로그인한 유저의 정보가 존재한다는 의미의 meData
    // 두개다 존재한다면 진행한다.
    if (ok && meData) {
      const { message } = getValues();

      // cache에 덮어씌울 메시지 오브젝트를 생성
      const messageObj = {
        id,
        payload: message,
        user: {
          username: meData.me.username,
          avatar: meData.me.avatar,
        },
        read: true,
        __typename: 'Message',
      };
      //   writeFragment을 이용하여 메시지 오브젝트를 덮어씌우는 방법
      const messageFragment = cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              username
              avatar
            }
            read
          }
        `,
        data: messageObj,
      });
      // seeRoom이라는 메시지를 갖고있는 캐시에 또한 덮어씌우기 위한 작업
      cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev) {
            return [messageFragment, ...prev];
          },
        },
      });
    }
  };
  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      update: updateSendMessage,
    }
  );

  const { data, loading } = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });

  const onValid = ({ message }) => {
    if (!sendingMessage) {
      sendMessageMutation({
        variables: {
          payload: message,
          roomId: route?.params?.id,
        },
      });
    }
  };

  //  react hook form의 text input에 등록
  useEffect(() => {
    //   메시지가 있어야지만 메시지 보내는 기능의 의미가 있으니 required:true 옵션 설정
    register('message', { required: true });
  }, [register]);

  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.username}`,
    });
  }, []);

  const renderItem = ({ item: message }) => (
    <MessageContainer
      outGoing={message.user.username !== route?.params?.talkingTo?.username}
    >
      <Author>
        <Avatar source={{ uri: message.user.avatar }} />
      </Author>
      <Message>{message.payload}</Message>
    </MessageContainer>
  );

  return (
    //   키보드가 나타날때 화면이 같이 올라가서 키보드가 화면을 가려버리지 않도록 해줌
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'black' }}
      behavior="padding"
      //   margin 같은 개념
      keyboardVerticalOffset={50}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          // inverted옵션으로 맨 아래가 가장 최신의 데이터가 오도록 만듬
          // 채팅에선 맨 아래 텍스트가 가장 최신 메시지로 로드함
          // inverted
          style={{ width: '100%', paddingTop: 10 }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
          data={data?.seeRoom?.messages}
          keyExtractor={message => '' + message.id}
          renderItem={renderItem}
        />
        <TextInput
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          placeholder="Write a message..."
          //   for android
          returnKeyLabel="Send Message"
          //for ios
          returnKeyType="send"
          //  input창에 text를 입력할때마나 message에 해당 입력된 값을 실시간으로 저장해줌
          onChangeText={text => setValue('message', text)}
          //   즉 return 위치의 버튼을 눌렀을때(오른쪽하단의 submit버튼 이름이 뭐든) 작동하는 함수 커스터마이징
          onSubmitEditing={handleSubmit(onValid)}
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
