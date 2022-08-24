<template>
  <div class="back">
    <p class="title">欢迎注册佳美口腔</p>
    <el-form ref="form" :model="form" :rules="rules">
      <span @click="$router.push('/login')">立即登录</span>
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
      <el-form-item prop="email" label="邮箱：">
        <el-input
          type="text"
          v-model="form.email"
          placeholder="请输入邮箱"
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
        >点击注册</el-button
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
        email: "",
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
        email: [{ required: true, message: "请填写邮箱", trigger: "blur" }],
      },
    };
  },
  methods: {
    //点击登录提交表单
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        console.log(this.form);
        if (valid) {
          //注册
          this.$http.LoginApi.getregister(this.form).then((res) => {
            console.log("注册", res);
            if (res.data.code == 200) {
              this.$message.success("注册成功，跳转登陆页面！");
              this.$router.push("/login");
            }
          });
        } else {
          this.$message.warning("表单填写错误！");
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
  top: 30%;
  left: 35%;
  border-radius: 15px;
}
.title {
  background-color: #33cccc3f;
  text-align: center;
  font-size: 2.5em;
  padding-top: 12%;
  color: #fff;
}
</style>
