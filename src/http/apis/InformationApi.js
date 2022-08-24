import myAxios from "../MyAxios";
import BASEURL from "../BaseUrl";
const informationApi = {
  //通过page和pagesize查询医生
  getinformation(params) {
    return myAxios.get(BASEURL + "/information", params);
  },
  //通过ID查询资讯信息
  getinformationId(params) {
    return myAxios.get(BASEURL + "/informationID", params);
  },
};

export default informationApi;
