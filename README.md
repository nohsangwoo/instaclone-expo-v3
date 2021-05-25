# 실리콘 m1용 expo 실행시 세팅방법(watchman 설치법)

- 참고
  https://chanho-yoon.github.io/silicon%20mac/m1-homebrew/

실리콘 맥북용 home brew설치 후

아래내용 설치해야 expo작동
I ran the following commands in the order:

npm install
brew update
brew install watchman
expo start

And it worked !

# App loading...

- https://docs.expo.io/versions/latest/sdk/app-loading/
- 내가 원할때까지 앱 로딩을 막아주는 기능

# 13.7 react navigation

- https://reactnavigation.org/docs/getting-started
- npm install @react-navigation/native
- expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

# debugging in expo

1. react native tools extension 설치
2. vsc settings에서 react native config에서 port 19001로 변경
3. debugg탭에서 create launch.json 후 devug in Exponent 선택
4. expo 로그인
5. expo start후 앱 실행
6. 이후 콘솔창에서 확인

- https://www.youtube.com/watch?v=9g2_j9U_l2U 참고

- stack navigator설치
  npm install @react-navigation/stack

# 14.1 Moving Through Screens

- TouchableOpacity
  해당 screen으로 이동하는 방법 중 하나 말그대로 터치하면 살짝 흐려지는 효과와 함께 해당 스크린으로 이동함

# about reactnavigation

- https://reactnavigation.org/

# 14.2 Navigator Props

https://reactnavigation.org/docs/stack-navigator

- initialRouteName
  첫화면의 라우트를 지정할수있음

```
  return (
    <!-- CreateAccount가 가장 첫 화면으로 나오게 만든다 -->
    <Stack.Navigator initialRouteName="CreateAccount">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
```

- mode
  화면이 띄워지는 형식을 지정

```
  return (
    <!-- 새로운 화면이 띄워지는 형식을 바꿈(이경우는 모달형식으로 새창을 띄워라! 기본값은 card형식이다) -->
    <Stack.Navigator mode="modal">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
```

- screen options (하위 route에 옵션을 전체 적용함

````
  <Stack.Navigator
      mode="modal"
      screenOptions={{ headerBackTitleVisible: false }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
        }}
        name="CreateAccount"
        component={CreateAccount}
      />
    </Stack.Navigator>
```)
````

# 14.3 Dark Mode

- styled-components in react native expo
  https://styled-components.com/
- 외형을 어떤걸 선택했는지 기억해줌
  https://docs.expo.io/versions/latest/sdk/appearance/

- app.json에 ios 및 android 등의 설정이 기록돼있음

# 14.5 Create Account part One

# expo eject tip1

eject를 할 때, ExpoKit이라는 네이티브 라이브러리를 남겨놓으면 EXPO에 내장된 다양한 React 컴포넌트들을 이용해 네이티브 기능을 쉽게 사용할 수 있습니다. 실제로 꾹꾹이 프로젝트에서도, EXPO의 Google 지도 컴포넌트(<MapView />)를 이용해 빠르게 지도 기능을 구현할 수 있었습니다.

# react native cli setup

https://dev-yakuza.posstree.com/ko/react-native/install-on-mac/

# eject issue

- https://96yj.tistory.com/7
