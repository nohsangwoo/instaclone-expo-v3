import { Camera } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, StatusBar, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import styled from 'styled-components/native';
import * as MediaLibrary from 'expo-media-library';
import { useIsFocused } from '@react-navigation/core';

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.35;
  padding: 0px 50px;
  align-items: center;
  justify-content: space-around;
`;

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`;

const SliderContainer = styled.View``;
const ActionsContainer = styled.View`
  flex-direction: row;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const PhotoActions = styled(Actions)`
  flex-direction: row;
`;

const PhotoAction = styled.TouchableOpacity`
  background-color: white;
  padding: 10px 25px;
  border-radius: 4px;
`;
const PhotoActionText = styled.Text`
  font-weight: 600;
`;

export default function TakePhoto({ navigation }) {
  const camera = useRef();
  const [takenPhoto, setTakenPhoto] = useState('');
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  // Camera.Constants.Type.back: 후면 카메라 라는 뜻
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);

  // 카메라를 사용하기위한 권한 요청
  const getPermissions = async () => {
    const { granted } = await Camera.requestPermissionsAsync();
    setOk(granted);
  };
  useEffect(() => {
    getPermissions();
  }, []);

  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };
  const onZoomValueChange = e => {
    setZoom(e);
  };

  // 버튼을 누를때마다 flash모드를 변경해주는 기능(off=>on=>auto 순서대로 계속 변경됨)
  const onFlashChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  const goToUpload = async save => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    }
    navigation.navigate('UploadForm', {
      file: takenPhoto,
    });
  };

  // 업로드 기능
  const onUpload = () => {
    // alert의 타이틀과 선택메뉴 사용방법
    Alert.alert('Save photo?', 'Save photo & upload or just upload', [
      // alert에서의 선택할수있는 메뉴 생성 방법
      {
        // sava & upload라는 선택 메뉴가 하나 생성되고
        text: 'Save & Upload',
        // 해당 메뉴를 선택하면 goToUpload가 실행되게 한다
        onPress: () => goToUpload(true),
      },
      {
        text: 'Just Upload',
        onPress: () => goToUpload(false),
      },
    ]);
  };

  const onCameraReady = () => setCameraReady(true);

  // 사진 찍는 기능
  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      // 사진찍는 기능에서 설정
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        // 사진의 정보를 포함한 메타데이터
        exif: true,
      });
      setTakenPhoto(uri);
      // console.log(photo);
    }
  };
  const onDismiss = () => setTakenPhoto('');
  const isFocused = useIsFocused();

  return (
    <Container>
      {isFocused ? <StatusBar hidden={true} /> : null}
      {/* 사진을 찍지 않은상태라면(takenPhoto에 사진 정보가 없다면)
      카메라 기능이 동작함 */}
      {takenPhoto === '' ? (
        <Camera
          type={cameraType}
          style={{ flex: 1 }}
          zoom={zoom}
          flashMode={flashMode}
          ref={camera}
          onCameraReady={onCameraReady}
        >
          <CloseButton onPress={() => navigation.navigate('Tabs')}>
            <Ionicons name="close" color="white" size={30} />
          </CloseButton>
        </Camera>
      ) : (
        // 사진을 찍은상태라면(takenPhoto에 저장된 사진 정보가 있다면)
        // 해당 사진을 이미지화하여 화면에 고정(카메라 off)
        <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
      )}
      {/* 사진정보가 없다면 카메라 옵션기능을 표시 */}
      {takenPhoto === '' ? (
        <Actions>
          <SliderContainer>
            <Slider
              style={{ width: 200, height: 20 }}
              value={zoom}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
              onValueChange={onZoomValueChange}
            />
          </SliderContainer>
          <ButtonsContainer>
            <TakePhotoBtn onPress={takePhoto} />
            <ActionsContainer>
              <TouchableOpacity
                onPress={onFlashChange}
                style={{ marginRight: 30 }}
              >
                <Ionicons
                  size={30}
                  color="white"
                  name={
                    flashMode === Camera.Constants.FlashMode.off
                      ? 'flash-off'
                      : flashMode === Camera.Constants.FlashMode.on
                      ? 'flash'
                      : flashMode === Camera.Constants.FlashMode.auto
                      ? 'eye'
                      : ''
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onCameraSwitch}>
                <Ionicons
                  size={30}
                  color="white"
                  name={
                    cameraType === Camera.Constants.Type.front
                      ? 'camera-reverse'
                      : 'camera'
                  }
                />
              </TouchableOpacity>
            </ActionsContainer>
          </ButtonsContainer>
        </Actions>
      ) : (
        // 사진정보가 있다면 해당 사진을 찍은후 선택 가능한 분기점을 생성
        <PhotoActions>
          <PhotoAction onPress={onDismiss}>
            <PhotoActionText>Dismiss</PhotoActionText>
          </PhotoAction>
          <PhotoAction onPress={onUpload}>
            <PhotoActionText>Upload</PhotoActionText>
          </PhotoAction>
          <PhotoAction>
            <PhotoActionText>Save & Upload</PhotoActionText>
          </PhotoAction>
        </PhotoActions>
      )}
    </Container>
  );
}
