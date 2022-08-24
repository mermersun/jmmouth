import myAxios from "../MyAxios";
import BASEURL from "../BaseUrl";
const searchApi = {
  //模糊查询所有医院名称
  search(params) {
    return myAxios.post(BASEURL + "/HD", params);
  },
};
export default searchApi;
