import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import {
  getMainDefinition,
  offsetLimitPagination,
} from '@apollo/client/utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from '@apollo/client/link/ws';

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar('');

const TOKEN = 'token';

// 기존 변수를 기록하기위한 작업
export const logUserIn = async token => {
  // 여러개의 변수를 asyncStorage에 한번에 저장하고 싶을때
  // await AsyncStorage.multiSet([
  //   ["token", token],
  //   ["loggedIn", "yes"],
  // ]);

  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar(null);
};
// http대신 createUploadLink를 사용하여 json통신만 하는게 아니라
// 더불어 파일도 같이 보낼수있게 해준다
const uploadHttpLink = createUploadLink({
  // uri: 'https://dangerous-elephant-91.loca.lt/graphql',
  uri: 'http://localhost:4000/graphql',
});

// for subscriptions
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    // 전달 받은 Params에서 token을 저장함
    connectionParams: {
      token: tokenVar(),
    },
  },
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log('Network Error', networkError);
  }
});

// cache를 export 해주기 위한 작업
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // merge와 동일한 기능
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
});

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

// split function: uploadHttpLink, wsLink을 구분하여 언제 각각 사용할지 지정해줌
// spilt func takes 3 arguments
// 첫번째는 함수 두번째는 wsLink, 세번째는 httpLink
const splitLink = split(
  // split함수의 첫번째 인자의 함수 조건이 true이면 wsLink를 선택하고
  // split함수의 두번째 인자의 함수 조건이 false이면 httpLink를 선택한다
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLinks
);

const client = new ApolloClient({
  // httplink가 항상 마지막에 연결돼야함
  link: splitLink,
  cache,
});
export default client;
