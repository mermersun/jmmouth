import myAxios from "../MyAxios";
import BASEURL from "../BaseUrl";
const hospitalApi = {
  //通过page和pagesize查询医院
  gethospital(params) {
    return myAxios.get(BASEURL + "/hospital", params);
  },

  //查询所有医院信息
  gethospitals() {
    return myAxios.get(BASEURL + "/hospitals");
  },

  //通过ID查询医院信息
  gethospitalId(params) {
    return myAxios.get(BASEURL + "/hospitalId", params);
  },

  //通过医生ID查询医院信息
  gethospitalById(params) {
    return myAxios.get(BASEURL + "/ByHospitalID", params);
  },

  //通过医院区，page和pagesize查询医院
  gethospitalByDistrict(params) {
    return myAxios.post(BASEURL + "/chooseDistrict", params);
  },

  //分页
  gethospitalfy(params) {
    return myAxios.get(BASEURL + "/hospitalfy", params);
  },
};

export default hospitalApi;
