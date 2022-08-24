<template>
  <div class="back">
    <p class="title">欢迎登录佳美口腔</p>
    <el-form ref="form" :model="form" :rules="rules">
      <span @click="$router.push('/register')">立即注册</span>
      <el-form-item prop="username" label="用户名：">
        <el-input
          type="text"
          v-model="form.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码：">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-button
        style="
          width: 100%;
          background-color: #33cccc;
          color: #fff;
          font-weight: bold;
          font-size: 1.2em;
        "
        @click="onSubmit()"
        >点击登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请填写账号", trigger: "blur" },
          {
            pattern: /^\w{3,15}$/,
            message: "3~15位字符，包含：数字、字母、下划线",
            trigger: blur,
          },
        ],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          {
            pattern: /^\w{6,15}$/,
            message: "6~15位字符，包含：数字、字母、下划线",
            trigger: blur,
          },
        ],
      },
    };
  },
  methods: {
    //点击登录提交表单
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          //登录查询
          this.$http.LoginApi.logincx({ username: this.form.username }).then(
            (res) => {
              console.log("登录查询", res);
              if (res.data.data[0].password !== this.form.password) {
                this.$message.error("用户名或密码错误，请重新登录！");
                this.form.username = "";
                this.form.password = "";
              }
              if (res.data.data[0].password == this.form.password) {
                console.log(this.form.password);
                this.$store.commit("updataUname", this.form.username);
                this.$router.push("/");
                this.$message.success("登录成功，跳转首页！");
              }
            }
          );
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.back {
  background-color: #33cccc;
  width: 100vw;
  height: 100vh;
  & span {
    display: block;
    text-align: right;
    color: #33cccc;
    &:hover {
      font-weight: bold;
    }
  }
}
.el-form {
  padding: 25px 40px;
  background-color: #fff;
  width: 25%;
  position: absolute;
  top: 35%;
  left: 35%;
  border-radius: 15px;
}
.title {
  background-color: #33cccc3f;
  text-align: center;
  font-size: 2.5em;
  padding-top: 15%;
  color: #fff;
}
</style>
