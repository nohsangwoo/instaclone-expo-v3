import React, { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import styled from 'styled-components/native';

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

export default function SelectPhoto() {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);

  //   접근권한이 수락되면 photo를 불러온다
  const getPhotos = async () => {
    if (ok) {
      const { assets: photos } = await MediaLibrary.getAssetsAsync();
      setPhotos(photos);
    }
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
      }
      //   권한요청 후 접근권한이 허가되면 setOk를 true로 설정(이것은 매번 접속때마다 묻지 않기위한 설정)
    } else if (accessPrivileges !== 'none') {
      setOk(true);
    }
  };

  useEffect(() => {
    getPermissions();
    getPhotos();
  }, []);

  return (
    <Container>
      <Top />
      <Bottom></Bottom>
    </Container>
  );
}
