<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-office-building"></i>
        首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/home/hospital' }"
        >医院</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{
        hospitalDetailList.hospital_name
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 医院详情上 -->
    <div class="detail_top">
      <div>
        <img :src="hospitalDetailList.picture" alt="" />
      </div>
      <div>
        <b style="vertical-align: middle">{{
          hospitalDetailList.hospital_name
        }}</b>
        <img
          style="vertical-align: middle"
          src="@/assets/hospital/logo.png"
          alt=""
        />
        <div>
          <img src="@/assets/hospital/location.png" alt="" />
          <span>{{ hospitalDetailList.address }}</span>
        </div>
        <div>
          <img src="@/assets/information/time.png" alt="" />
          <span>{{ hospitalDetailList.hospital_time }}</span>
        </div>
        <span v-for="item in business" :key="item.id">{{ item }}</span>
        <p>
          {{ hospitalDetailList.hospital_detail }}
        </p>
        <button @click="dialogFormVisible = true">立即预约</button>
      </div>
    </div>
    <!-- 医院详情下 -->
    <div class="detail_bottom">
      <div>
        <span
          :class="{
            active:
              this.$route.path == `/home/hospital_detail/${id}/information`,
          }"
          @click="$router.push(`/home/hospital_detail/${id}/information`)"
          >医院信息</span
        >
        <span
          :class="{
            active:
              this.$route.path == `/home/hospital_detail/${id}/environment`,
          }"
          @click="$router.push(`/home/hospital_detail/${id}/environment`)"
          >口腔环境</span
        >
      </div>
      <router-view v-if="cs && hospitalDetailList" :item="hospitalDetailList" />
    </div>
    <!-- 预约表单 -->
    <el-dialog width="35%" title="预约信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="姓名">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="联系电话">
          <el-input
            placeholder="请输入您的联系方式（我们会尽快联系您）"
            v-model="form.phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="留言板">
          <el-input
            placeholder="请留言"
            type="textarea"
            v-model="form.board"
          ></el-input>
        </el-form-item>
        <el-button
          style="background-color: #33cccc; color: #fff"
          @click="submitForm('form')"
          >确 定</el-button
        >
      </el-form>
      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        board: "",
        name: "",
        phone: "",
      },
      dialogFormVisible: false, //弹出框
      id: this.$route.params.id, //首页传过来的参数id
      hospitalDetailList: [], //医院详情信息
      business: [], //医院业务
      cs: false, //异步请求是否完成
      rules: {
        phone: [
          { required: true, message: "请输入您的联系方式", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.hospitalDetail();
  },
  methods: {
    //点击留言确定
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          this.$message.success("预约成功！");
        } else {
          this.$message.warning("请完善表单！");
          return false;
        }
      });
    },
    //通过ID查询医院信息
    hospitalDetail() {
      this.$http.HospitalApi.gethospitalId({ id: this.id }).then((res) => {
        console.log("通过ID查询医院信息", res);
        this.hospitalDetailList = res.data.data;
        this.business = this.hospitalDetailList.business.split("，");
        this.cs = true;
      });
    },
    //预约医院
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
.detail_top {
  width: 1220px;
  margin: 0 auto;
  display: flex;
  height: 350px;
  justify-content: space-between;
  & > div:first-child {
    height: 100%;
    width: 30%;
    padding: 20px 0;
    & > img {
      width: 100%;
      border-radius: 10px;
    }
  }
  & > div:last-child {
    height: 100%;
    width: 70%;
    padding: 30px 20px;
    & > div > span {
      line-height: 30px;
      font-size: 0.9em;
      color: #888;
      vertical-align: middle;
    }
    & > div > img {
      width: 18px;
      vertical-align: middle;
    }
    & > span {
      display: inline-block;
      background-color: #eee;
      padding: 3px 8px;
      margin: 10px 5px;
      border-radius: 6px;
      font-size: 0.9em;
    }
    & > p {
      text-indent: 2em;
      line-height: 30px;
      font-size: 0.9em;
      color: #555;
      //文本超出显示...
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
      word-break: break-all; /* break-all(允许在单词内换行。)  对pc端可以不要*/
      -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
      -webkit-line-clamp: 2; /** 显示的行数 **/
    }
    & > button {
      border: none;
      background-color: #33cccc;
      width: 170px;
      line-height: 40px;
      border-radius: 25px;
      color: #fff;
      font-weight: bold;
      font-size: 1.1em;
      margin: 10px 0;
      cursor: pointer;
    }
  }
}
.detail_bottom {
  width: 1220px;
  margin: 0 auto;
  & > div:first-child {
    background-color: #33cccc12;
    height: 40px;
    & > span {
      box-sizing: border-box;
      display: inline-block;
      padding: 7px 0 4px 0;
      color: #666;
      margin: 0 30px;
      border-bottom: 3px solid transparent;
      &.active {
        color: #0c7d88;
        border-color: #0c7d88;
        font-weight: bold;
      }
    }
  }
}
</style>
