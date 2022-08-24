<template>
  <div>
    <!-- 导航栏 -->
    <div style="background-color: #33cccc">
      <div class="header">
        <b @click="$router.push('/home/index')">佳美口腔</b>
        <div class="nav_left">
          <span
            :class="{ active: this.$route.path == '/home/index' }"
            @click="$router.push('/home/index')"
            >首页</span
          >
          <span
            :class="{ active: this.$route.path == '/home/hospital' }"
            @click="$router.push('/home/hospital')"
            >医院</span
          >
          <span
            :class="{ active: this.$route.path == '/home/doctor' }"
            @click="$router.push('/home/doctor')"
            >医生</span
          >
          <span
            :class="{ active: this.$route.path == '/home/information' }"
            @click="$router.push('/home/information')"
            >资讯</span
          >
          <span
            :class="{ active: this.$route.path == '/home/aboutUs' }"
            @click="$router.push('/home/aboutUs')"
            >关于我们</span
          >
        </div>
        <div class="nav_right">
          <input type="text" placeholder="请输入医院或医生名称" />
          <img src="@/assets/search.png" alt="" />
          <div v-show="!$store.state.username">
            <span @click="$router.push('/login')">登录</span>
            <i>|</i>
            <span @click="$router.push('/register')">注册</span>
          </div>
          <div v-show="$store.state.username">
            <span>欢迎{{ $store.state.username }}</span>
            <i>|</i>
            <span @click="logout">退出</span>
          </div>
        </div>
      </div>
    </div>
    <router-view />
    <!-- 页脚 -->
    <div style="background-color: #0c7d88">
      <div class="footer">
        <div>
          <p>佳美科技有限公司</p>
          <p>地址：山西省太原市</p>
          <p>联系电话：333000</p>
          <p>联系邮箱：shmer4985@163.com</p>
        </div>
        <div>
          <b>快速入口</b>
          <div>
            <span @click="$router.push('/home/index')">首页</span>
            <span @click="$router.push('/home/hospital')">口腔医院</span>
            <span @click="$router.push('/home/doctor')">口腔医生</span>
            <span @click="$router.push('/home/information')">资讯</span>
            <span @click="$router.push('/home/aboutUs')">关于我们</span>
          </div>
        </div>
        <div>
          <b>友情连接</b>
          <div>
            <a href="https://dxy.com/" target="_blank">丁香医生</a>
            <a href="https://www.alihealth.cn/" target="_blank">阿里健康</a>
            <a href="https://www.haodf.com/" target="_blank">好大夫</a>
            <a href="https://www.tongrentang.com/" target="_blank"
              >北京同仁堂</a
            >
            <a href="http://www.ciming.com/" target="_blank">慈铭体验</a>
          </div>
        </div>
      </div>
      <p class="botm">佳美口腔 — 互联网口腔健康管理平台</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hospital_name: null,
    };
  },
  mounted() {
    console.log(this.$route.path);
  },
  methods: {
    logout() {
      this.$store.commit("logout", null);
      this.$message.success("您已退出！");
    },
    // search() {
    //   let inp = document.getElementById("inp");
    //   console.log(inp.value);
    //   //模糊查询所有医院名称
    //   this.$http.SearchApi.search({ hospital_name: inp.value }).then((res) => {
    //     console.log("模糊查询所有医院名称", res);
    //     res.data.data.forEach((item) => {
    //       this.hospital_name = item.hospital_name;
    //     });
    //     if (res.data.data.lenght)
    //       this.$router.push(
    //         `/home/hospital_detail/${this.hospital_name}/information`
    //       );
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  height: 50px;
  background-color: #33cccc;
  justify-content: space-between;
  color: #fff;
  align-items: center;
  user-select: none;

  b {
    font-size: 2.2em;
    font-family: YouYuan;
    cursor: pointer;
  }

  input {
    border-radius: 15px;
    border: 0;
    width: 220px;
    height: 30px;
    padding: 0 15px;
    background-color: #82dada;
    outline: none;
    caret-color: #fff;
  }

  input::-webkit-input-placeholder {
    color: #fff;
  }
  span:hover {
    font-weight: bold;
  }

  .nav_left {
    span {
      display: inline-block;
      line-height: 46px;
      width: 80px;
      cursor: pointer;
      text-align: center;
      border-bottom: 4px solid transparent;

      &.active {
        border-color: #09a7a7;
        background-color: #82dada;
        font-weight: bold;
      }
    }
    span:hover {
      background-color: #82dada;
      border-color: #09a7a7;
    }
  }
  .nav_right {
    display: flex;
    align-items: center;
    font-size: 0.9em;
    position: relative;

    img {
      position: absolute;
      left: 218px;
      width: 28px;
      cursor: pointer;
    }

    div {
      margin-left: 20px;

      span {
        margin: 0 6px;
        cursor: pointer;
      }
    }
  }
}
.footer {
  height: 240px;
  width: 1200px;
  background-color: #0c7d88;
  color: #fff;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;

  > div:not(:first-child) > div {
    width: 350px;
  }

  p {
    margin: 15px 0;
  }

  div:nth-child(2) span,
  a {
    display: inline-block;
    width: 100px;
    margin: 15px 0;
    cursor: pointer;
  }
  div:nth-child(2) span:hover,
  a:hover {
    font-weight: bold;
  }

  a {
    color: #fff;
  }
}
.botm {
  width: 1000px;
  text-align: center;
  color: #fff;
  font-size: 1.5em;
  font-family: KaiTi;
  user-select: none;
  margin: 0 auto;
  box-sizing: border-box;
  padding-bottom: 30px;
}
</style>
