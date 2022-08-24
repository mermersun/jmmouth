<template>
  <div v-if="informationData">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-office-building"></i>
        首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/home/information' }"
        >资讯</el-breadcrumb-item
      >
    </el-breadcrumb>
    <!-- 筛选 -->
    <div class="choose" @click="showChoose">
      <div>
        <b>按类型：</b>
        <span
          :class="{ active: sx[0] == item.information_type }"
          @click="sx[0] = item.information_type"
          v-for="item in information_typeList"
          :key="item.id"
          >{{ item.information_type }}</span
        >
      </div>
      <div>
        <b>按项目：</b>
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
    <div class="content" v-if="informationData.result.length">
      <div class="left">
        <div
          @click="$router.push(`/home/information_detail/${item.id}/`)"
          v-for="item in informationData.result"
          :key="item.id"
        >
          <img :src="item.picture" alt="" />
          <div>
            <div>
              <b>{{ item.title }}</b>
              <p>{{ item.article }}</p>
            </div>
            <div>
              <div>
                <img src="@/assets/information/author.png" alt="" />
                <span>{{ item.author }}</span>
              </div>
              <div>
                <img src="@/assets/information/time.png" alt="" />
                <span>{{ item.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div>
          <p>口腔专题</p>
          <div>
            <div>
              <img src="@/assets/information/1.png" alt="" />
              <span>牙齿种植</span>
            </div>
            <div>
              <img src="@/assets/information/2.png" alt="" />
              <span>牙齿矫正</span>
            </div>
            <div>
              <img src="@/assets/information/3.png" alt="" />
              <span>牙齿美白</span>
            </div>
            <div>
              <img src="@/assets/information/4.png" alt="" />
              <span>牙齿贴面</span>
            </div>
            <div>
              <img src="@/assets/information/5.png" alt="" />
              <span>隐形矫正</span>
            </div>
            <div>
              <img src="@/assets/information/6.png" alt="" />
              <span>根管治疗</span>
            </div>
            <div>
              <img src="@/assets/information/7.png" alt="" />
              <span>牙齿治疗</span>
            </div>
            <div>
              <img src="@/assets/information/8.png" alt="" />
              <span>智齿拔除</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-empty v-else description="暂无数据"></el-empty>
    <!-- 分页 -->
    <div class="paging" v-if="informationData">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="informationData.total"
        :page-size="informationData.pagesize"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      information_typeList: [], //筛选information_type
      skillList: [], //筛选skill
      informationData: null, //分页信息
      sx: ["新闻资讯", "种植牙"], //分页上传字段数组
      doctor_skillbg: [], //二维数组
      doctor_skillsm: [], //将医生数组技能分割成字符串,放入二维数组
    };
  },
  mounted() {
    this.sohwgetInformation_type();
    this.sohwSkill();
    this.showChoose();
  },
  methods: {
    //查询getInformation_type
    sohwgetInformation_type() {
      this.$http.ChooseApi.getInformation_type().then((res) => {
        console.log("查询getInformation_type", res);
        this.information_typeList = res.data.data;
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
      this.$http.ChooseApi.getInformationChoosefy({
        information_type: this.sx[0],
        skill: this.sx[1],
        page: 1,
        pagesize: 4,
      }).then((res) => {
        console.log("筛选条件", this.sx[0], this.sx[1]);
        console.log("筛选分页", res);
        this.informationData = res.data.data;
        // res.data.data.result.forEach((Res) => {
        //   this.doctor_skillsm = Res.doctor_skill.split("，");
        //   this.doctor_skillbg.push(this.doctor_skillsm);
        // });
      });
    },
    //点击分页
    handleCurrentChange(val) {
      this.$http.ChooseApi.getInformationChoosefy({
        information_type: this.sx[0],
        skill: this.sx[1],
        page: val,
        pagesize: 4,
      }).then((res) => {
        console.log("筛选条件", this.sx[0], this.sx[1]);
        console.log("筛选分页", res);
        this.informationData = res.data.data;
        // res.data.data.result.forEach((Res) => {
        //   this.doctor_skillsm = Res.doctor_skill.split("，");
        //   this.doctor_skillbg.push(this.doctor_skillsm);
        // });
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
  justify-content: space-around;
  & > .left {
    cursor: pointer;
    width: 73%;
    & > div {
      padding: 15px;
      border-radius: 10px;
      margin-bottom: 20px;
      height: 200px;
      box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
      display: flex;
      & > img {
        width: 35%;
      }
      & > div {
        padding: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        & > div:first-child {
          & > p {
            font-size: 0.9em;
            color: #444;
            line-height: 30px;
            margin-top: 20px;
            //文本超出显示...
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
            word-break: break-all; /* break-all(允许在单词内换行。)  对pc端可以不要*/
            -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
            -webkit-line-clamp: 2; /** 显示的行数 **/
          }
        }
        & > div:last-child {
          display: flex;
          justify-content: space-between;
          & > div {
            & > span {
              vertical-align: middle;
              font-size: 0.9em;
              color: #999;
            }
            & > img {
              vertical-align: middle;
              width: 20px;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
  & > .right {
    width: 24%;

    & > div {
      box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
      display: flex;
      flex-wrap: wrap;
      border-radius: 10px;
      & > p {
        padding-left: 20px;
        line-height: 50px;
        font-weight: bold;
      }
      & > div {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        padding-bottom: 20px;
        & > div {
          margin: 15px 0;
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          & > img {
            width: 60%;
          }
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
