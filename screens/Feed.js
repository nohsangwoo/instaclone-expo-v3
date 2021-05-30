import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import Photo from '../components/Photo';
import ScreenLayout from '../components/ScreenLayout';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments';

// seeFeed trigger생성
const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        id
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
  // refetch: 이전에 불러온 쿼리를 새롭게 다시 불러오는 기능
  // fetchMore: 말그대로 새로고침하지않고 추가로 더 불러오는 data
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      // 기본으로 skip할 값은 0 (backend설정이 offset을 기준으로 Skip하게 설계함)
      offset: 0,
    },
  });

  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />;
  };

  const refresh = async () => {
    setRefreshing(true);
    // (FEED_QEURY를 다시 불러온다(새로고침))
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);

  return (
    <ScreenLayout loading={loading}>
      {/* map이랑 비슷하다 someList.map((data,index)=>{
        return (<RenderComponent>some contents</RenderComponent>);
      }) */}
      <FlatList
        // onEndReached가 실행되기 위해서 감지되는 화면 마지막의 위치를 설정가능
        // 기본값은 살짝 마지막에 도달하기 조금 전으로 설정돼있고
        // 값을 0 으로 주면 진짜로 스크롤을 끝까지 내려야만 onEndReached가 감지하고 실행됨
        // 근데 값을 0으로 주면 버그 생김 그래서 조금이라도 좀 전에 작동하게 설정
        onEndReachedThreshold={0.02}
        // 사용자가 스크롤 마지막으로 도달했다고 react native가 인지했을때
        // 어떤 작동을 할건지 지정 가능
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeFeed?.length,
            },
          })
        }
        // refreshing을 할수있는 상태인지 아닌지 true면 새로고침할수있는 상태
        // false면 새로고침 기능 비활성화
        refreshing={refreshing}
        // 새로고침 실행시 작동하는 함수
        onRefresh={refresh}
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
