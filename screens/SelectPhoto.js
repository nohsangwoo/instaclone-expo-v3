import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import styled from 'styled-components/native';
import {
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { colors } from '../colors';
import uuid from 'react-native-uuid';

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
  background-color: black;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

export default function SelectPhoto({ navigation }) {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState('');
  const [chosenPhotoFileName, setChosenPhotoFileName] = useState('');

  //   접근권한이 수락되면 photo를 불러온다
  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
  };

  //   media-library를 사용하기 위한 권한을 사용자에게 요청한다.
  const getPermissions = async () => {
    // accessPrivileges가 none이면 유저가 권한요청을 거절했거나 아직 권한요청을 하지 않았다는 뜻
    // canAskAgain은 accessPrivileges가 부정적인 입장이면 true상태임
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    //   접근권한 상태가 none일때 유저에게 MediaLibrary 권한 요청을 한다
    if (accessPrivileges === 'none' && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      //   권한요청 후 접근권한이 허가되면 setOk를 true로 설정
      if (accessPrivileges !== 'none') {
        setOk(true);
        getPhotos();
      }
      //   권한요청 후 접근권한이 허가되면 setOk를 true로 설정(이것은 매번 접속때마다 묻지 않기위한 설정)
    } else if (accessPrivileges !== 'none') {
      setOk(true);
      getPhotos();
    }
  };

  // 오른쪽 header의 component
  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('UploadForm', {
          file: chosenPhoto,
          uuidFilename: chosenPhotoFileName,
        })
      }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    getPermissions();
  }, []);

  // 말그대로 네비게이션의 오른쪽 header를 커스터 마이징 해준다
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenPhoto]);

  const numColumns = 4;
  const { width } = useWindowDimensions();
  const choosePhoto = (uri, fileName) => {
    const fileNameWithUUID = uuid.v4() + fileName;
    // console.log('uuid', fileNameWithUUID); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    setChosenPhoto(uri);
    setChosenPhotoFileName(fileNameWithUUID);
  };

  // 하단에 미리보기로 렌더링되는 사진 목록들
  const renderItem = ({ item: photo }) => (
    <ImageContainer
      onPress={() => {
        // console.log(photo);
        return choosePhoto(photo.uri, photo.filename);
      }}
    >
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          // 미리보기사진의 오른쪽 하단에 작은 체크아이콘이 있는데
          // 해당 체크아이콘이 선택된 상태라면 파란색으로 변경됨
          color={photo.uri === chosenPhoto ? colors.blue : 'white'}
        />
      </IconContainer>
    </ImageContainer>
  );

  return (
    <Container>
      <Top>
        <StatusBar hidden={false} />
        {/* 상단에 현재 선택된 사진이 크게 미리보기됨(초기 화면은 가장 첫번째 사진으로 초기화됨) */}
        {chosenPhoto !== '' ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: '100%' }}
          />
        ) : null}
      </Top>
      <Bottom>
        {/* map같은거라 생각하면됨 */}
        <FlatList
          // 사용할 data
          data={photos}
          //   한줄에 몇개의 column을 표현할 것 인가
          numColumns={numColumns}
          // map의 key같은거
          keyExtractor={photo => photo.id}
          //   어떤 방법으로 data의 값들을 렌더링할 것 인지
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
}
