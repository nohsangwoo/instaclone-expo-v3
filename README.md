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
