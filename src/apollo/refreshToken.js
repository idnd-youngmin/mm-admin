import jwtDecode from "jwt-decode";
import moment from "moment";

export const RefreshToken = (fn) => {
  let localData = localStorage.getItem("userToken");

  let value = "";
  const url =
    process.env.REACT_APP_NODE_ENV === "production"
      ? process.env.REACT_APP_SERVER
      : process.env.REACT_APP_TEST_SERVER;

  let getAccessToken = () => {
    let aa = localStorage.getItem("userToken");
    return JSON.parse(aa).access_token;
  };

  let getRefreshToken = () => {
    let aa = localStorage.getItem("userToken");
    return JSON.parse(aa).refresh_token;
  };



  if (localData) {
    const access = getAccessToken();
    const decoded = access ? jwtDecode(access) : "";
    const nowTime = moment(new Date()).format("X");
    const expireTime = decoded ? decoded.exp : 0;
    const remainingTime = access
      ? parseInt(expireTime, 10) - parseInt(nowTime, 10)
      : 0;
    console.log("remainingTime: ", remainingTime);
    if (remainingTime < 11) {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `mutation refresh {
            refresh(refresh_token: "${getRefreshToken()}") {
              access_token
            }
          }`,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log("then2: ", res);

          if (!res.errors) {
            const json = JSON.parse(localData);
            json.access_token = res.data.refresh.access_token;
            localStorage.setItem("userToken", JSON.stringify(json));
            value = res.data.refresh.access_token;
          } else {
            localStorage.removeItem("userToken");
            alert("로그인이 필요합니다.");
            window.location.reload();
            //history.replace("/");
          }
        });
    }
  }
  return value;
};
