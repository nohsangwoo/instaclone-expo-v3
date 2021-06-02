import { gql, useMutation } from '@apollo/client';
import { ReactNativeFile } from 'apollo-upload-client';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { colors } from '../colors';
import DismissKeyboard from '../components/DismissKeyboard';
import { FEED_PHOTO } from '../fragments';

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedPhoto
    }
  }
  ${FEED_PHOTO}
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 350px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

export default function UploadForm({ route, navigation }) {
  // cache: 기존에 프론트 캐시에 저장된 값들
  // result: mutation 실행후 반환 받은 값
  const updateUploadPhoto = (cache, result) => {
    const {
      data: { uploadPhoto },
    } = result;
    if (uploadPhoto.id) {
      cache.modify({
        //   웹처럼 쿼리를 특정하는 id를 따로 지정하지 않고 ROOT_QEURY로 퉁친다
        // 모든 쿼리결과가 ROOT_QUERY에 저장됨
        id: 'ROOT_QUERY',
        // modify하려는 object의 field
        // 웹에선 특정 값을 찾아서 덮어씌웠지만
        // 앱에선 쿼리자체를 덮어 씌움
        // 여기서 uploadPhoto는 Photo
        fields: {
          seeFeed(prev) {
            return [uploadPhoto, ...prev];
          },
        },
      });
      navigation.navigate('Tabs');
    }
  };

  const [uploadPhotoMutation, { loading }] = useMutation(
    UPLOAD_PHOTO_MUTATION,
    { update: updateUploadPhoto }
  );

  const TextInputRef = useRef();

  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register('caption');
  }, [register]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);

  const onValid = ({ caption }) => {
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: `1.jpg`,
      type: 'image/jpeg',
    });

    uploadPhotoMutation({
      variables: {
        caption,
        file,
      },
    });
  };

  useEffect(() => {
    TextInputRef.current.focus();
  }, []);

  return (
    //   dismisskeyboard영역을 터치하면 키보드가 사라짐
    <DismissKeyboard>
      <Container>
        {/* 전달받은 사진을 화면에 렌더링해줌 */}
        <Photo resizeMode="contain" source={{ uri: route.params.file }} />
        <CaptionContainer>
          <Caption
            ref={TextInputRef}
            returnKeyType="done"
            placeholder="Write a caption..."
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={text => setValue('caption', text)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}
