<template>
  <div v-if="doctorData">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-office-building"></i>
        首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/home/doctor' }"
        >医生</el-breadcrumb-item
      >
    </el-breadcrumb>
    <!-- 筛选 -->
    <div class="choose" @click="showChoose">
      <div>
        <b>所在区域：</b>
        <span
          :class="{ active: sx[0] == item.district }"
          @click="sx[0] = item.district"
          v-for="item in districtList"
          :key="item.id"
          >{{ item.district }}</span
        >
      </div>
      <div>
        <b>擅长项目：</b>
        <span
          :class="{ active: sx[1] == item.skill }"
          @click="sx[1] = item.skill"
          v-for="item in skillList"
          :key="item.id"
          >{{ item.skill }}</span
        >
      </div>
    </div>
    <!-- 内容 -->
    <div class="content" v-if="doctorData.result.length">
      <div
        @click="$router.push(`/home/doctor_detail/${item.id}`)"
        v-for="(item, i) in doctorData.result"
        :key="item.id"
      >
        <div>
          <img :src="item.picture" alt="" />
        </div>
        <div>
          <b>{{ item.doctor_name }}</b>
          <img src="@/assets/hospital/logo.png" alt="" />
          <span>{{ item.doctor_position }}</span>
          <div>
            <span>擅长：</span>
            <span v-for="skill in doctor_skillbg[i]" :key="skill">{{
              skill
            }}</span>
          </div>
          <span>所属地：{{ item.district }}</span>
        </div>
      </div>
    </div>
    <el-empty v-else description="暂无数据"></el-empty>
    <!-- 分页 -->
    <div class="paging" v-if="doctorData">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="doctorData.total"
        :page-size="doctorData.pagesize"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      districtList: [], //筛选district
      skillList: [], //筛选skill
      doctorData: null, //分页信息
      sx: ["小店区", "种植牙"], //分页上传字段数组
      doctor_skillbg: [], //二维数组
      doctor_skillsm: [], //将医生数组技能分割成字符串,放入二维数组
    };
  },
  mounted() {
    this.sohwDistrict();
    this.sohwSkill();
    this.showChoose();
  },
  methods: {
    //查询district
    sohwDistrict() {
      this.$http.ChooseApi.getDistrict().then((res) => {
        console.log("查询district", res);
        this.districtList = res.data.data;
      });
    },
    //查询skill
    sohwSkill() {
      this.$http.ChooseApi.getSkill().then((res) => {
        console.log("查询skill", res);
        this.skillList = res.data.data;
      });
    },
    //条件筛选
    showChoose() {
      this.$http.ChooseApi.getDoctorChoosefy({
        district: this.sx[0],
        doctor_skill: this.sx[1],
        page: 1,
        pagesize: 9,
      }).then((res) => {
        console.log("筛选条件", this.sx[0], this.sx[1]);
        console.log("筛选分页", res);
        this.doctorData = res.data.data;
        res.data.data.result.forEach((Res) => {
          this.doctor_skillsm = Res.doctor_skill.split("，");
          this.doctor_skillbg.push(this.doctor_skillsm);
        });
      });
    },
    //点击分页
    handleCurrentChange(val) {
      this.$http.ChooseApi.getDoctorChoosefy({
        district: this.sx[0],
        doctor_skill: this.sx[1],
        page: val,
        pagesize: 9,
      }).then((res) => {
        console.log("筛选条件", this.sx[0], this.sx[1]);
        console.log("筛选分页", res);
        this.doctorData = res.data.data;
        res.data.data.result.forEach((Res) => {
          this.doctor_skillsm = Res.doctor_skill.split("，");
          this.doctor_skillbg.push(this.doctor_skillsm);
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin: 20px auto;
  width: 1220px;
  font-size: 1em;
  ::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #33cccc;
  }
}
.choose {
  width: 1200px;
  margin: 30px auto;

  & > div {
    border: 1px solid #ccc;
    padding: 13px 20px;
    & > b {
      font-size: 0.9em;
    }
    & > span {
      display: inline-block;
      padding: 4px 10px;
      margin: 0 13px;
      border-radius: 15px;
      color: #333;
      &:hover {
        font-weight: bold;
      }
      &.active {
        background-color: #82dada;
        font-weight: bold;
      }
    }
  }
}
.content {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  & > div {
    cursor: pointer;
    width: 380px;
    margin: 20px 10px;
    padding: 5px;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
    display: flex;
    justify-content: space-between;
    & > div:first-child {
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      & > img {
        width: 90%;
        border-radius: 50%;
      }
    }
    & > div:last-child {
      width: 100%;
      & > b,
      img,
      span {
        vertical-align: middle;
        line-height: 45px;
      }
      & > div > span:not(:nth-child(1)) {
        display: inline-block;
        border-radius: 6px;
        margin: 0 4px;
        padding: 4px;
        line-height: 20px;
        background-color: #f7f9fd;
      }
    }
  }
}
.paging {
  width: 1200px;
  margin: 20px auto;
  .el-pagination {
    text-align: right;
  }
  ::v-deep .el-pager li:not(.disabled).active {
    background-color: #33cccc;
  }
  ::v-deep .el-pager li:not(.active):hover {
    color: #33cccc;
  }
}
</style>
