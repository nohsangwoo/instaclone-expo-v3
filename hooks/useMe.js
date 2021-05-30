import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { isLoggedInVar, logUserOut } from '../apollo';

// create me trigger
const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`;

export default function useMe() {
  // reactive Vriable 호출 (isLoggedInVar)
  const hasToken = useReactiveVar(isLoggedInVar);
  // 트리거를 이용한 me hook 생성(사실상 생성과 동시에 실행됨)
  const { data } = useQuery(ME_QUERY, {
    //  토큰이 존재하지 않는다면 skip(데이터 불러오는것을 skip한다)
    skip: !hasToken,
  });

  useEffect(() => {
    //   me가 불러와지지 않는다면 로그아웃
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data };
}
