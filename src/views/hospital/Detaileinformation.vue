<template>
  <div class="information">
    <b>基础信息</b>
    <div>
      <span>成立时间：{{ item.establish }} 年</span>
      <span>门店面积：{{ item.area }} m<sup>2</sup></span>
      <span>诊室数量：{{ item.classroom }} 个</span>
      <span>牙椅数量：{{ item.chair }} 张</span>
      <span>机构类别：{{ item.category }}</span>
      <span>医保政策：{{ item.insurance }}</span>
    </div>
    <b>医生信息</b>
    <div v-if="doctorIDs">
      <div v-for="(item, i) in doctorIDs" :key="item.id">
        <img
          src="http://localhost:8000/33e20e97-046b-4732-aad8-d0ba7cfe132e.jpg"
          alt=""
        />
        <div>
          <b>{{ item.doctor_name }}</b>
          <span>{{ item.doctor_position }}</span>
        </div>
        <span v-for="skill in doctor_skillbg[i]" :key="skill">{{ skill }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      doctorIDs: [], //通过医院ID查询医生列表
      doctor_skillbg: [], //二维数组
      doctor_skillsm: [], //将医生数组技能分割成字符串,放入二维数组
    };
  },
  mounted() {
    this.getdoctorByIDs();
  },
  methods: {
    //通过医院ID查询医生
    getdoctorByIDs() {
      this.$http.DoctorApi.getdoctorByID({ id: this.item.id }).then((res) => {
        console.log("通过医院ID查询医生", res);
        res.data.data.forEach((Res) => {
          this.doctorIDs = res.data.data;
          this.doctor_skillsm = Res.doctor_skill.split("，");
          this.doctor_skillbg.push(this.doctor_skillsm);
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.information {
  padding: 10px;
  & > b {
    display: inline-block;
    margin: 20px 0;
  }
  & > div:nth-child(2) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 1000px;
    & > span {
      line-height: 40px;
      width: 500px;
      color: #666;
    }
  }
  & > div:nth-child(4) {
    height: 280px;
    display: flex;
    & > div {
      box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
      border-radius: 10px;
      height: 100%;
      width: 230px;
      text-align: center;
      margin: 0 20px;
      & > img {
        margin-top: 30px;
        height: 45%;
        border-radius: 50%;
      }
      & > div {
        margin: 15px 0;
        & > b {
          margin: 10px;
        }
        & > span {
          color: #999;
        }
      }
      & > span {
        display: inline-block;
        background-color: #f7f9fd;
        margin: 3px;
        padding: 3px 8px;
        border-radius: 8px;
        font-size: 0.9em;
      }
    }
  }
}
</style>
