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

# 14.8 Natural Forms part Two

# 14.9 Login Screen

# TouchableWithoutFeedback 버그 우회

```
<TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === 'WEB'}
    >
```

# 14.10 React Hooks Forms on Native

# 14.11 Apollo Client

# 14.12 Log In Mutation & reactive variable

- 다른 route로 갈때 props를 전달하고 전달 받는 과정 학습
- route로 이동시 props와 함께 전달 하는 방법

```
navigation.navigate('LogIn', {
  username,
  password,
});
```

-

# ngrok or localtunnel

https://ngrok.com/
https://github.com/localtunnel/localtunnel

- ActivityIndicator
  로딩애니메이션

# https://reactnative.directory/

- react native directory
  react native에서 사용할수있는 api들을 모아둔 패키지들

# 14.14 AsyncStorage part One

- redux persist 같은 설정
  https://github.com/react-native-async-storage/async-storage 참조
  너무 많이 쓰는 패키지라 공식문서에도 소개됨
  https://docs.expo.io/versions/latest/sdk/async-storage/

# 15.3 Stack and Tabs part Owe

- tab navigation 안에 stack navigation을 쌓고싶을때

# 15.3 Stack and Tabs part Two

실제 작동하게 만들어줌

# 15.4 Apollo Auth

- navigation header에 이미지 삽입
- apollo setting

# 15.5 FlatList

화면에 나타나는 컴포넌트만 일단 렌더링하고 화면의 범위를 넘어서는 부분의 컴포넌트는 스크롤 하는경우에 추가로 렌더링 한다

# 15.6 Photo part One

- component나누고 props전달 방법

# 15.7 Photo part Two

- getSize로 이미지의 실제 크기를 불러와 컨트롤 한다

# 15.8 Photo part Three

# 15.9 Pull to Refresh(Feed.js)

- 화면을 아래로 잡아당겼을때 새로고침되는 것을 말함
- refetch
  이전에 불러온 쿼리를 새롭게 다시 불러오는 기능

# 15.10 Infinite Scrolling part One

- 무한스크롤링 사용법 (Feed의 onReached관련..)
