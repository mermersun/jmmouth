<template>
  <div v-if="hospitalData">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-office-building"></i>
        首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/home/hospital' }"
        >医院</el-breadcrumb-item
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
        <b>机构类型：</b>
        <span
          :class="{ active: sx[1] == item.hospital_type }"
          @click="sx[1] = item.hospital_type"
          v-for="item in hospital_typeList"
          :key="item.id"
          >{{ item.hospital_type }}</span
        >
      </div>
      <div>
        <b>擅长项目：</b>
        <span
          :class="{ active: sx[2] == item.skill }"
          @click="sx[2] = item.skill"
          v-for="item in skillList"
          :key="item.id"
          >{{ item.skill }}</span
        >
      </div>
    </div>
    <!-- 内容 -->
    <div class="content" v-if="hospitalData.result.length">
      <div
        @click="$router.push(`/home/hospital_detail/${item.id}/information`)"
        v-for="item in hospitalData.result"
        :key="item.id"
      >
        <img :src="item.picture" alt="" />
        <div>
          <b>{{ item.hospital_name }}</b>
          <img src="@/assets/hospital/logo.png" alt="" />
          <div>
            <img src="@/assets/hospital/location.png" alt="" />
            <span>{{ item.address }}</span>
          </div>
          <div>
            <img src="@/assets/information/time.png" alt="" />
            <span>{{ item.hospital_time }}</span>
          </div>
          <p>
            {{ item.hospital_detail }}
          </p>
        </div>
      </div>
    </div>
    <el-empty v-else description="暂无数据"></el-empty>
    <!-- 分页 -->
    <div class="paging" v-if="hospitalData">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="hospitalData.total"
        :page-size="hospitalData.pagesize"
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
      hospital_typeList: [], //筛选hospital_type
      skillList: [], //筛选skill
      hospitalData: null, //分页信息
      sx: ["小店区", "公立医院口腔", "种植牙"], //分页上传字段数组
    };
  },
  mounted() {
    this.sohwDistrict();
    this.sohwHospital_type();
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
    //查询getHospital_type
    sohwHospital_type() {
      this.$http.ChooseApi.getHospital_type().then((res) => {
        console.log("查询getHospital_type", res);
        this.hospital_typeList = res.data.data;
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
      this.$http.ChooseApi.getHospitalChoosefy({
        district: this.sx[0],
        hospital_type: this.sx[1],
        business: this.sx[2],
        page: 1,
        pagesize: 2,
      }).then((res) => {
        console.log("筛选条件", this.sx[0], this.sx[1], this.sx[2]);
        console.log("筛选分页", res);
        this.hospitalData = res.data.data;
      });
    },
    //点击分页
    handleCurrentChange(val) {
      this.$http.ChooseApi.getHospitalChoosefy({
        district: this.sx[0],
        hospital_type: this.sx[1],
        business: this.sx[2],
        page: val,
        pagesize: 2,
      }).then((res) => {
        console.log("筛选条件", this.sx[0], this.sx[1], this.sx[2]);
        console.log("筛选分页", res);
        this.hospitalData = res.data.data;
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
  & > div {
    cursor: pointer;
    margin: 20px 0;
    padding: 20px;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;

    display: flex;
    justify-content: space-evenly;
    & > img {
      width: 25%;
      border-radius: 10px;
    }
    & > div {
      width: 70%;
      padding: 10px 20px;
      & > b,
      img {
        vertical-align: middle;
        line-height: 50px;
      }
      & > div {
        line-height: 35px;
        color: #666;
        & > img,
        span {
          width: 20px;
          padding-right: 5px;
          vertical-align: middle;
        }
      }
      & > p {
        margin-top: 10px;
        letter-spacing: 0.1em;
        color: #444;
        //文本超出显示...
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        word-break: break-all; /* break-all(允许在单词内换行。)  对pc端可以不要*/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 3; /** 显示的行数 **/
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
