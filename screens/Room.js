import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import React, { useEffect, useRef } from 'react';
import { FlatList, KeyboardAvoidingView, View } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import styled from 'styled-components/native';
import { useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import useMe from '../hooks/useMe';

const ROOM_UPDATES = gql`
  subscription roomUpdates($id: Int!) {
    roomUpdates(id: $id) {
      id
      payload
      user {
        username
        avatar
      }
      read
    }
  }
`;

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
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  color: white;
  border-radius: 1000px;
  width: 90%;
  margin-right: 10px;
`;

const InputContainer = styled.View`
  width: 95%;
  margin-bottom: 50px;
  margin-top: 25px;
  flex-direction: row;
  align-items: center;
`;

const SendButton = styled.TouchableOpacity``;

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
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
  const messageInputRef = useRef();
  const { data: meData } = useMe();
  const { register, setValue, handleSubmit, getValues, watch } = useForm();
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
      //   여기까지 왔다면 messagemutation은 일단 성공했다는 의미니깐 form의 message text input값을 비워준다
      setValue('message', '');
      messageInputRef.current.focus();

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
            return [...prev, messageFragment];
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

  const { data, loading, subscribeToMore } = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });

  useEffect(() => {
    // data.seeRoom이 있다는말은 ROOM_QUERY가 실행된뒤 seeRoom을 반환했다는 의미
    if (data?.seeRoom) {
      subscribeToMore({
        // subscribeToMore에 사용될 subscriptions는 ROOM_UPDATES
        document: ROOM_UPDATES,
        // ROOM_UPDATE에 사용될 variables
        variables: {
          id: route?.params?.id,
        },
      });
    }
  }, [data]);

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

  //   처음엔 값이 없다가 나중에 값이 들어오는 경우에 이렇게 해결함
  // 값이 없을땐 빈배열을 spread해주고 값이 있을땐 해당값을 spread해줌
  const messages = [...(data?.seeRoom?.messages ?? [])];
  messages.reverse();

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
          inverted
          style={{ width: '100%', marginVertical: 10 }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
          data={messages}
          showsVerticalScrollIndicator={false}
          keyExtractor={message => '' + message.id}
          renderItem={renderItem}
        />
        <InputContainer>
          <TextInput
            ref={messageInputRef}
            // 자동 대문자변환 방지
            autoCapitalize="none"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            placeholder="Write a message..."
            returnKeyLabel="Send Message"
            returnKeyType="send"
            onChangeText={text => setValue('message', text)}
            onSubmitEditing={handleSubmit(onValid)}
            value={watch('message')}
          />
          <SendButton
            onPress={handleSubmit(onValid)}
            disabled={!Boolean(watch('message'))}
          >
            <Ionicons
              name="send"
              color={
                !Boolean(watch('message'))
                  ? 'rgba(255, 255, 255, 0.5)'
                  : 'white'
              }
              size={22}
            />
          </SendButton>
        </InputContainer>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
