import myAxios from "../MyAxios";
import BASEURL from "../BaseUrl";
const chooseApi = {
  //查询district所有信息
  getDistrict(params) {
    return myAxios.get(BASEURL + "/district", params);
  },
  //查询hospital_type所有信息
  getHospital_type() {
    return myAxios.get(BASEURL + "/hospital_type");
  },
  //查询information_type所有信息
  getInformation_type() {
    return myAxios.get(BASEURL + "/information_type");
  },
  //查询skill所有信息
  getSkill() {
    return myAxios.get(BASEURL + "/skill");
  },
  //医院筛选（分页）
  getHospitalChoosefy(params) {
    return myAxios.post(BASEURL + "/hospital/fy/type", params);
  },
  //医生筛选（分页）
  getDoctorChoosefy(params) {
    return myAxios.post(BASEURL + "/doctor/fy/type", params);
  },
  //医生筛选（分页）
  getInformationChoosefy(params) {
    return myAxios.post(BASEURL + "/information/fy/type", params);
  },
};

export default chooseApi;
