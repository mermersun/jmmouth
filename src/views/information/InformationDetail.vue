<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-office-building"></i>
        首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/home/information' }"
        >资讯</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ informationList.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 文章主体内容 -->
    <div class="content">
      <div>
        <p>{{ informationList.title }}</p>
        <div>
          <img src="@/assets/information/author.png" alt="" />
          <span>{{ informationList.author }}</span>
        </div>
        <div>
          <img src="@/assets/information/time.png" alt="" />
          <span>{{ informationList.time }}</span>
        </div>
      </div>
      <div>
        <img :src="informationList.picture" alt="" />
        <p>{{ informationList.article }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id, //首页传过来的参数id
      informationList: [], //资讯列表
    };
  },
  mounted() {
    this.informationDetail();
  },
  methods: {
    //通过ID查询资讯信息
    informationDetail() {
      this.$http.InformationApi.getinformationId({ id: this.id }).then(
        (res) => {
          console.log("通过ID查询资讯信息", res);
          this.informationList = res.data.data;
        }
      );
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
.content {
  width: 1220px;
  margin: 0 auto;
  padding-right: 200px;
  box-sizing: border-box;
  & > div:first-child {
    text-align: center;
    margin: 40px;
    & > p {
      font-size: 1.6em;
      font-weight: bold;
      margin: 10px 0;
    }
    & > div {
      display: inline-block;
      width: 200px;
      & > img {
        width: 18px;
        vertical-align: middle;
      }
      & > span {
        color: #888;
        font-size: 0.9em;
        vertical-align: middle;
      }
    }
  }
  & > div:last-child {
    width: 100%;
    margin: 40px 0;
    & > img {
      float: left;
      width: 300px;
      margin: 10px 30px;
    }
    & > p {
      line-height: 30px;
      margin: 20px 0;
      text-indent: 2em;
      padding-left: 30px;
    }
  }
}
</style>
