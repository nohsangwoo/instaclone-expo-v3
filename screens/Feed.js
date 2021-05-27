import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import Photo from '../components/Photo';
import ScreenLayout from '../components/ScreenLayout';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments';

// seeFeed trigger생성
const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  # fragment사용법
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default function Feed() {
  const { data, loading } = useQuery(FEED_QUERY);

  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />;
  };

  return (
    <ScreenLayout loading={loading}>
      {/* map이랑 비슷하다 someList.map((data,index)=>{
        return (<RenderComponent>some contents</RenderComponent>);
      }) */}
      <FlatList
        style={{ width: '100%' }}
        // 세로 스크롤바를 안보이게 설정
        showsVerticalScrollIndicator={false}
        // 사용법
        // 사용되는 데이터(리스트)를 넣어주고
        data={data?.seeFeed}
        // 고유 식별자 (map돌릴때 key랑 같은기능)
        // key={photo.id} 라는 뜻이랑 같다
        keyExtractor={photo => '' + photo.id}
        // 해당 데이터를 어떻게 가공해서 렌더링할건지 정한 컴포넌트를 집어넣고
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}
