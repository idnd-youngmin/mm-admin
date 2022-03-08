import { gql, InMemoryCache } from "apollo-boost";
import { ApolloClient, HttpLink } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "@apollo/client/link/context";
import jwtDecode from "jwt-decode";

function createApolloClient(req) {
  // const isSsr = typeof window === "undefined";
  // const uri = isSsr ? `http://localhost:${PORT}/graphql` : "/graphql";

  const getRefreshToken = () => {
    let aa = localStorage.getItem("userToken");
    return JSON.parse(aa)?.refresh_token;
  };

  const getAccessToken = () => {
    let aa = localStorage.getItem("userToken");
    return JSON.parse(aa)?.access_token;
  };

  const url =
    process.env.REACT_APP_NODE_ENV === "production"
      ? process.env.REACT_APP_SERVER
      : process.env.REACT_APP_TEST_SERVER;

  const getToken = async (userToken) => {
    const access_token = userToken?.access_token;
    const refresh_token = userToken?.refresh_token;
    // console.log(access_token, "access_tokenaccess_tokenaccess_token");
    if (access_token) {
      try {
        const { exp } = jwtDecode(access_token);
        if (Date.now() < exp * 1000) {
          // return access_token;
          if (refresh_token) {
            const res = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                operationName: null,
                query: gql`
                  mutation refresh($refresh_token: String!) {
                    refresh(refresh_token: $refresh_token) {
                      access_token
                    }
                  }
                `.loc.source.body,
                variables: {
                  refresh_token,
                },
              }),
            });
            console.log("확인중 리프레쉬 코인확인중");
            const { data } = await res.json();
            const access_token = data.refresh.access_token;
            // storeToken(null, { access_token });
            return access_token;
          }
        } else {
          await localStorage.removeItem("userToken");
        }
        console.log("로그아웃확인중");
      } catch (e) {
        console.log(e);
        return access_token;
      }
    }
    // console.log("로그아웃확인중");
  };

  const httpLink = createHttpLink({
    uri: url, // Server URL (must be absolute)
    credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
    fetch,
  });

  const authLink = setContext(async (_, { headers }) => {
    let token;

    try {
      let aa = localStorage.getItem("userToken");
      JSON.parse(aa);
      token = await getToken(JSON.parse(aa));
    } catch (e) {
      console.log(e);
    }

    if (token) {
      let aa = localStorage.getItem("userToken");
      const hh = JSON.parse(aa);
      hh.access_token = token;
      JSON.stringify(hh);
      localStorage.setItem("userToken", JSON.stringify(hh));
      return {
        headers: {
          ...headers,
          // authorization: `Bearer ${token}`,
          authorization: token ? token : "",
        },
      };
    } else {
      return { headers };
    }
  });

  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    // ssrMode: isSsr,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}
export const client = createApolloClient();

// ------
// const url =
//   process.env.REACT_APP_NODE_ENV === "production"
//     ? process.env.REACT_APP_SERVER
//     : process.env.REACT_APP_TEST_SERVER;

// const httpLink = createHttpLink({
//   uri: url,
// });

// const authLink = setContext((_, { headers }) => {
//   const userToken = JSON.parse(localStorage.getItem("userToken"));

//   return {
//     headers: {
//       ...headers,
//       authorization: userToken ? userToken.access_token : "",
//       // authorization: userToken ? `Bearer ${userToken}` : "",
//     },
//   };
// });

// export const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// ------------------------------
