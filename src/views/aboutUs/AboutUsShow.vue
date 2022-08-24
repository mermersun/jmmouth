<template>
  <div>
    <!-- 公司简介 -->
    <div class="intro" id="1F">
      <div>
        <img src="@/assets/primary/xzl.png" alt="" />
        <div>
          <b>公司简介</b>
          <p>
            哩哩口腔是一家互联网口腔健康平台，总部位于中国深圳，核心团队来自于腾讯、百度、就医160、3M等公司，公司团队在线上运营和口腔医疗行业深耕多年，洞察行业革新和前沿技术，通过整合口腔专家、口腔医院、供应链等资源，为患者提供更优质、更优惠、更透明的口腔健康服务，提升患者就诊体验！
          </p>
        </div>
      </div>
    </div>
    <!-- 我们的使命 -->
    <div class="mission" id="2F">
      <img src="@/assets/primary/sm.png" alt="" />
      <div>
        <b>我们的使命</b>
        <p>为患者提供更优质、更优惠、更透明的口腔健康服务！</p>
      </div>
    </div>
    <!-- 合作伙伴 -->
    <div class="partner" id="3F">
      <p>合作伙伴</p>
      <div>
        <div>
          <img src="@/assets/partner/1.png" alt="" />
        </div>
        <div>
          <img src="@/assets/partner/2.png" alt="" />
        </div>
        <div>
          <img src="@/assets/partner/3.png" alt="" />
        </div>
        <div>
          <img src="@/assets/partner/4.png" alt="" />
        </div>
        <div>
          <img src="@/assets/partner/5.png" alt="" />
        </div>
        <div>
          <img src="@/assets/partner/6.png" alt="" />
        </div>
        <div>
          <img src="@/assets/partner/7.png" alt="" />
        </div>
        <div>
          <img src="@/assets/partner/8.png" alt="" />
        </div>
        <div>
          <img src="@/assets/partner/9.png" alt="" />
        </div>
        <div>
          <img src="@/assets/partner/10.png" alt="" />
        </div>
      </div>
    </div>
    <!-- 公司地址 -->
    <div class="address" id="4F">
      <div class="top">
        <div>
          <b>公司地址</b>
        </div>
        <p>
          <img src="@/assets/primary/address.png" alt="" />
          &nbsp;地址：山西省太原市小店区
        </p>
        <p>
          <img src="@/assets/primary/phone.png" alt="" />
          &nbsp;联系电话：188-3520-4985
        </p>
        <p>
          <img src="@/assets/primary/email.png" alt="" />
          &nbsp;联系邮箱：shmer4985@163.com
        </p>
      </div>
      <div class="bottom" id="mapContainer"></div>
    </div>
    <!-- 商务合作 -->
    <div class="cooperation" id="5F">
      <div>
        <b>商务合作</b>
      </div>
      <p>机构合作：电话/微信 18835204985 孙慧敏</p>
      <p>其他合作：电话/微信 18835204985 孙mer</p>
    </div>
    <!-- 锚点固定定位 -->
    <div class="fixed">
      <a @click="num = 1" :class="{ active: num == 1 }" href="#1F">公司简介</a>
      <a @click="num = 2" :class="{ active: num == 2 }" href="#2F"
        >我们的使命</a
      >
      <a @click="num = 3" :class="{ active: num == 3 }" href="#3F">合作伙伴</a>
      <a @click="num = 4" :class="{ active: num == 4 }" href="#4F">公司地址</a>
      <a @click="num = 5" :class="{ active: num == 5 }" href="#5F">商务合作</a>
    </div>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  data() {
    return {
      map: null,
      num: 1,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    //显示地图
    initMap() {
      AMapLoader.load({
        key: "a506ee23cd661ec14ddf39ee524f3c64", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [""], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          // 创建一个 Marker 实例：
          this.map = new AMap.Map("mapContainer", {
            //设置地图容器id
            viewMode: "3D", //是否为3D地图模式
            zoom: 10, //初始化地图级别
            center: [112.789667, 37.727893], //初始化地图中心点位置
          });
          var marker = new AMap.Marker({
            position: new AMap.LngLat(112.789667, 37.727893), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: "北京",
          });
          // 将创建的点标记添加到已有的地图实例：
          this.map.add(marker);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.intro {
  width: 1170px;
  margin: 80px auto;
  display: flex;
  justify-content: space-between;
  & > div:first-child {
    position: relative;
    & > img {
      width: 600px;
      border-radius: 10px;
    }
    & > div {
      box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
      background-color: #fff;
      width: 500px;
      position: absolute;
      left: 450px;
      top: 40px;
      border-radius: 10px;
      padding: 20px;
      box-sizing: border-box;
      & > b {
        font-size: 1.8em;
      }
      & > p {
        line-height: 40px;
        font-size: 0.9em;
      }
    }
  }
}
.mission {
  width: 1220px;
  margin: 0 auto;
  position: relative;
  & > img {
    width: 80%;
  }
  & > div {
    position: absolute;
    bottom: 80px;
    left: 210px;
    text-align: center;
    & > b {
      font-size: 1.7em;
      letter-spacing: 0.3em;
    }
    & > p {
      line-height: 80px;
      font-size: 1.2em;
    }
  }
}
.partner {
  width: 1000px;
  height: 380px;
  margin: 80px 80px;
  user-select: none;

  & > p {
    height: 20%;
    text-align: center;
    padding: 30px;
    box-sizing: border-box;
    font-weight: bold;
    font-size: 1.6em;
    letter-spacing: 0.3em;
  }
  & > div {
    height: 80%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;

    & > div {
      border: 1.5px solid #eee;
      width: 20%;
      height: 50%;
      text-align: center;
      box-sizing: border-box;

      & > img {
        width: 90%;
        padding: 27% 0;
      }
    }
  }
}
.address {
  width: 1000px;
  margin: 0 0 60px 80px;
  background-color: #f1fbfb;
  & > .top {
    & > div {
      text-align: center;
      & > b {
        line-height: 100px;
        font-size: 1.6em;
        letter-spacing: 0.3em;
      }
    }
    & > p {
      line-height: 40px;
      font-size: 1.3em;
      padding-left: 20px;
      display: flex;
      align-items: center;
    }
  }
  & > .bottom {
    border: 1px solid #ccc;
    margin-top: 20px;
    height: 300px;
    width: 100%;
    box-sizing: border-box;
  }
}
.cooperation {
  width: 1150px;
  margin-bottom: 60px;
  & > div {
    text-align: center;
    & > b {
      line-height: 100px;
      font-size: 1.6em;
      letter-spacing: 0.3em;
    }
  }
  & > p {
    padding-left: 80px;
    line-height: 40px;
    font-size: 1.3em;
  }
}
.fixed {
  position: fixed;
  right: 40px;
  bottom: 300px;
  width: 280px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > a {
    border-bottom: 1px solid #ccc;
    line-height: 62px;
    box-sizing: border-box;
    padding: 0 30px;
    font-size: 1.5em;
    color: #444;
    cursor: pointer;
    &:hover {
      color: #32a9a9;
    }
    &.active {
      color: #32a9a9;
    }
  }
}
</style>
