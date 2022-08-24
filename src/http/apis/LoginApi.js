import myAxios from "../MyAxios";
import BASEURL from "../BaseUrl";
const loginApi = {
  //登录查询
  logincx(params) {
    return myAxios.post(BASEURL + "/logincx", params);
  },
  //注册
  getregister(params) {
    return myAxios.post(BASEURL + "/register", params);
  },
};
export default loginApi;
