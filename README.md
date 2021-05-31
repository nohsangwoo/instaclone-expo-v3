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
- fetchMore: 말그대로 새로고침하지않고 추가로 더 불러오는 data

# 15.11 Infinite Scrolling part two

- offsetLimitPagination? merge?
- fetchMore로 추가 로드한 부분이 cache에 각각 따로 저장되는 현상을 방지하고
  하나의 데이터로 합쳐지길 원할때

```
cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          seeFeed: offsetLimitPagination(),
            // merge 사용방법
          // seeFeed:{
          // existing은 기존 데이터, incomming은 fetchMore로 새로 추가된 데이터
          //   merge(existing = [], incomming = []){
          //     return [...existing, ...incomming]
          //   }
          // }
        },
      },
    },
  }),
```

# 15.12 Cache Persist

persist 적용방법

# 16.0 Likes part One

- feed에서 like 클릭시 parameter를 같이보내기
- 여기서도 새로고침기능 추가

# 16.1 Likes part Two

- ItemSeparatorComponent

```
 <FlatList
  // 아이템 사이에는 적용되지만 맨 위와 맨 아래에는 적용되지 않는 컴포넌트
  // 희미한 seperator선을 만들기 위한 작업
  ItemSeparatorComponent={() => (
    <View
      style={{
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      }}
    ></View>
```

- and serialize의 bug 수정(app.js)

# 16.2 Header Domination

- navigation.setOptions
  네비게이션과 관련된 옵션을 설정가능(타이틀이나, 색, 정렬 등등..)

# 16.3 Search part One

- TouchableWithoutFeedback
  이부분을 클릭하면 키보드입력창이 비활성화 되게 설정

# 16.4 Search part Two

- useLazyQuery
  보통 쿼리문은 hook을 생성과 동시에 실행되지만
  LazyQuery의 경우 hook생성시 동작트리거를 또 만들어 해당 트리거가 호출되는 시점에서 query가 실행된다

# 16.6 Search part Four

- FlatList - numColumns
  반복되어 렌더링되는 배열의 column 갯 수

# comment 부분 작업 seeComments 작업은 끝냈고 create, delete 작업을 나중에 진행

# 17.0 Modal Navigator

- 기존 tab navigation을 stack navigation으로 또한번 감싸주는 작업
  카메라를 선택시 stack으로 작업하고 싶어서 이런 작업을 진행
  이때 camera가 나타나는 방식이 카드 형태가 아니라 모달 형태로 나타나게 설정
- navigator의 route(props)는 navigation에 접근 가능

# 17.1 Bottom Tabs Navigator

- createMaterialTopTabNavigator
  또다른 네비게이터종류
  https://reactnavigation.org/docs/material-top-tab-navigator/ 참고

# 17.2 Select Photo part One

- navigation option설정
