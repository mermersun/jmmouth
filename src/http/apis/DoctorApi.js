import myAxios from "../MyAxios";
import BASEURL from "../BaseUrl";
const doctorApi = {
  //通过page和pagesize查询医生
  getdoctor(params) {
    return myAxios.get(BASEURL + "/doctor", params);
  },
  //通过医院ID查询医生
  getdoctorByID(params) {
    return myAxios.get(BASEURL + "/ByDoctorID", params);
  },
  //通过ID查询医生
  getdoctorID(params) {
    return myAxios.get(BASEURL + "/doctorID", params);
  },
};

export default doctorApi;
