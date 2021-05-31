import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { colors } from '../colors';

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 10px;
`;

const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
`;
const Username = styled.Text`
  font-weight: 800;
  color: white;
`;

const Comment = styled.Text`
  color: white;
`;

const FollowBtn = styled.TouchableOpacity`
  background-color: ${colors.blue};
  justify-content: center;
  padding: 5px 10px;
  border-radius: 4px;
`;
const FollowBtnText = styled.Text`
  color: white;
  font-weight: 600;
`;

export default function CommentRow({ id, isMine, payload, user }) {
  console.log('commentRosw', id, isMine, payload, user);
  const navigation = useNavigation();
  return (
    <Wrapper>
      <Column
        onPress={() =>
          navigation.navigate('Profile', {
            username: user.username,
            id: user.id,
          })
        }
      >
        <Avatar source={{ uri: user.avatar }} />
        <Username>{user.username}</Username>
      </Column>
      <Comment>test commetns</Comment>
      {/* {!isMe ? (
        <FollowBtn>
          <FollowBtnText>{isFollowing ? 'Unfollow' : 'Follow'}</FollowBtnText>
        </FollowBtn>
      ) : null} */}
    </Wrapper>
  );
}
