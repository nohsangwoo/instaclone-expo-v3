import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { offsetLimitPagination } from '@apollo/client/utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const httpLink = createHttpLink({
  uri: 'https://selfish-horse-43.loca.lt/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});
export default client;
