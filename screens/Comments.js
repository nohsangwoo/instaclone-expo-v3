import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import { useState } from 'react/cjs/react.development';
import { COMMENT_FRAGMENT, USER_FRAGMENT } from '../fragments';
import ScreenLayout from '../components/ScreenLayout';
import CommentRow from '../components/CommentRow';

const SEE_PHOTO_COMMENTS = gql`
  query seePhotoComments($id: Int!) {
    seePhotoComments(id: $id) {
      ...CommentFragment
    }
  }
  ${COMMENT_FRAGMENT}
`;

export default function Comments({ route }) {
  const [refreshing, setRefreshing] = useState(false);

  const { data, loading, refetch } = useQuery(SEE_PHOTO_COMMENTS, {
    variables: {
      id: route?.params?.photoId,
    },
    skip: !route?.params?.photoId,
  });

  // console.log(data?.seePhotoComments);

  const renderComments = ({ item: comment }) => {
    return <CommentRow {...comment} />;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        // 아이템 사이에는 적용되지만 맨 위와 맨 아래에는 적용되지 않는 컴포넌트
        // 희미한 seperator선을 만들기 위한 작업
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: '100%',
              height: 1,
            }}
          ></View>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data?.seePhotoComments}
        keyExtractor={item => '' + item.id}
        renderItem={renderComments}
        style={{ width: '100%', color: 'white' }}
      />
    </ScreenLayout>
  );
}
