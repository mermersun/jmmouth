<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-office-building"></i>
        首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/home/doctor' }"
        >医生</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ doctorList.doctor_name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 医生详情上 -->
    <div class="detail_top">
      <div>
        <img :src="doctorList.picture" alt="" />
      </div>
      <div>
        <b style="vertical-align: middle">{{ doctorList.doctor_name }}</b>
        <img
          style="vertical-align: middle"
          src="@/assets/hospital/logo.png"
          alt=""
        />
        <span style="vertical-align: middle">{{
          doctorList.doctor_position
        }}</span>
        <div>
          <span>擅长：</span>
          <span
            class="skill"
            v-for="doctor_skill in doctor_skills"
            :key="doctor_skill"
            >{{ doctor_skill }}</span
          >
        </div>
        <div>
          <span>所属地：{{ doctorList.district }}</span>
        </div>
        <button @click="dialogFormVisible = true">立即预约</button>
      </div>
    </div>
    <hr style="width: 1220px; color: #ccc; margin: 0 auto" />
    <!-- 医生详情下 -->
    <div class="detail_bottom">
      <b>学历</b>
      <p>{{ doctorList.education }}</p>
      <b>荣誉</b>
      <p v-for="honor in honors" :key="honor.id">
        {{ honor }}
      </p>
      <b>认证</b>
      <p v-for="authentication in authentications" :key="authentication.id">
        {{ authentication }}
      </p>
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
      doctorList: [], //医生列表
      doctor_skills: [], //医生技能分割为数组
      honors: [], //医生荣誉分割为数组
      authentications: [], //医生认证分割为数组
      rules: {
        phone: [
          { required: true, message: "请输入您的联系方式", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.doctorDetail();
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
    //通过ID查询医生信息
    doctorDetail() {
      this.$http.DoctorApi.getdoctorID({ id: this.id }).then((res) => {
        console.log("通过ID查询医生信息", res);
        this.doctor_skills = res.data.data.doctor_skill.split("，");
        this.honors = res.data.data.honor.split("，");
        this.authentications = res.data.data.authentication.split("，");
        this.doctorList = res.data.data;
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
.detail_top {
  width: 1220px;
  margin: 0 auto;
  display: flex;
  height: 300px;
  justify-content: space-between;
  & > div:first-child {
    height: 100%;
    width: 25%;
    text-align: center;
    & > img {
      width: 90%;
      border-radius: 10px;
    }
  }
  & > div:last-child {
    height: 100%;
    width: 75%;
    padding: 30px 10px;
    & > span {
      font-size: 0.9em;
      color: #888;
    }
    & > div {
      & > span {
        display: inline-block;
        margin: 10px 0;
        color: #333;
        font-size: 0.9em;
      }
      & > .skill {
        background-color: #eee;
        border-radius: 6px;
        padding: 3px 10px;
        margin: 0 4px;
      }
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
  margin: 10px auto;
  margin-bottom: 80px;
  & > b {
    display: inline-block;
    margin: 50px 10px 10px 10px;
  }
  & > p {
    margin: 5px 10px;
    color: #666;
    font-size: 0.9em;
    width: 200px;
  }
}
</style>
