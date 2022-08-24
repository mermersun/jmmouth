<template>
  <div>
    <!-- 轮播图 -->
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
        <img src="@/assets/swiper/01.png" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/swiper/02.png" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/swiper/03.png" alt="" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 医院展示部分 -->
    <div class="hospital" v-if="hospitalList3 && hospitalLists">
      <div class="hs_left">
        <!-- 医院地区标题栏 -->
        <div>
          <div style="display: flex; algin-item: center">
            <span
              style="
                display: inline-block;
                height: 110%;
                width: 5px;
                border-radius: 8px;
                background-color: #33cccc;
                margin-right: 10px;
              "
            ></span>
            <b>口腔机构</b>
            <span
              @click="choose(item.district)"
              v-for="item in districtList"
              :key="item.id"
              >{{ item.district }}</span
            >
          </div>
          <span @click="$router.push('/home/hospital')">更多></span>
        </div>
        <!-- 医院组件首页 -->
        <div v-if="hospitalList3.length !== 0">
          <index-hospital
            :item="item"
            v-for="item in hospitalList3"
            :key="item.id"
          />
        </div>
        <el-empty v-else description="暂无数据"></el-empty>
        <!-- 更多店 -->
        <div>
          <p
            :item="item"
            v-for="item in hospitalLists"
            :key="item.id"
            @click="$router.push(`/home/hospital_detail/${item.id}`)"
          >
            {{ item.hospital_name }}>
          </p>
        </div>
      </div>
      <div class="hs_right">
        <div>
          <b>推荐医院</b>
        </div>
        <index-recommend
          :item="item"
          v-for="item in hospitalList4"
          :key="item.id"
        />
      </div>
    </div>
    <!-- 医生推荐 -->
    <div class="doctor">
      <div>
        <b>推荐医生</b>
        <p>
          佳美口腔深耕口腔行业多年，了解各个城市优质口腔医生资源，按照专业、服务、口碑等多个维度甄选优质口腔医生，帮助其实现“信息化、体系化、服务化”，提升医生医疗效率，降低患者看牙费用。
        </p>
      </div>
      <div v-if="doctorList4">
        <index-doctor :item="item" v-for="item in doctorList4" :key="item.id" />
      </div>
      <p @click="$router.push('/home/doctor')">查看更多></p>
    </div>
    <!-- 口腔资讯 -->
    <div class="information">
      <div class="if_left">
        <div style="display: flex; algin-item: center">
          <span
            style="
              display: inline-block;
              height: 35%;
              width: 5px;
              border-radius: 8px;
              background-color: #33cccc;
              margin-right: 10px;
            "
          ></span>
          口腔资讯
        </div>
        <div>
          <index-informationleft
            :item="item"
            v-for="item in informationList2"
            :key="item.id"
          />
        </div>
      </div>
      <div class="if_right">
        <div>
          <span @click="$router.push('/home/information')">更多</span>
        </div>
        <div>
          <index-informationright
            :item="item"
            v-for="item in informationList3"
            :key="item.id"
          />
        </div>
      </div>
    </div>
    <!-- 合作伙伴 -->
    <div class="partner">
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
  </div>
</template>

<script>
import IndexHospital from "@/components/index/IndexHospital.vue";
import IndexRecommend from "@/components/index/IndexRecommend.vue";
import IndexDoctor from "@/components/index/IndexDoctor.vue";
import IndexInformationright from "@/components/index/IndexInformationright.vue";
import IndexInformationleft from "@/components/index/IndexInformationleft.vue";
export default {
  components: {
    IndexHospital,
    IndexRecommend,
    IndexDoctor,
    IndexInformationright,
    IndexInformationleft,
  },
  data() {
    return {
      informationList3: [], //前三条资讯
      informationList2: [], //前两条资讯
      hospitalList3: [], //前三条医院列表
      hospitalList4: [], //前五条医院列表
      hospitalLists: [], //全部医院列表
      doctorList4: [], //全部医院列表
      districtList: [], //筛选全部信息
      //轮播图
      swiperOption: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        loop: true,
        effect: "coverflow",
      },
    };
  },
  mounted() {
    this.showHospital3();
    this.showHospital5();
    this.showHospitals();
    this.showDoctor4();
    this.showInformation2();
    this.showInformation3();
    this.sohwDistrict();
  },
  methods: {
    //查询district
    sohwDistrict() {
      this.$http.ChooseApi.getDistrict({ id: 1 }).then((res) => {
        console.log("查询district", res);
        this.districtList = res.data.data;
      });
    },
    //通过page和pagesize查询医院3
    showHospital3() {
      this.$http.HospitalApi.gethospital({ page: 1, pagesize: 3 }).then(
        (res) => {
          console.log("通过page和pagesize查询医院3", res);
          this.hospitalList3 = res.data.data;
        }
      );
    },
    //通过page和pagesize查询医院5
    showHospital5() {
      this.$http.HospitalApi.gethospital({ page: 1, pagesize: 4 }).then(
        (res) => {
          console.log("通过page和pagesize查询医院", res);
          this.hospitalList4 = res.data.data;
        }
      );
    },
    //查询所有医院信息
    showHospitals() {
      this.$http.HospitalApi.gethospitals().then((res) => {
        console.log("查询所有医院信息", res);
        this.hospitalLists = res.data.data;
      });
    },
    //通过page和pagesize查询医生
    showDoctor4() {
      this.$http.DoctorApi.getdoctor({ page: 1, pagesize: 4 }).then((res) => {
        console.log("通过page和pagesize查询医生", res);
        this.doctorList4 = res.data.data;
      });
    },
    //通过page和pagesize查询资讯2
    showInformation2() {
      this.$http.InformationApi.getinformation({ page: 1, pagesize: 2 }).then(
        (res) => {
          console.log("通过page和pagesize查询资讯2", res);
          this.informationList2 = res.data.data;
        }
      );
    },
    //通过page和pagesize查询资讯3
    showInformation3() {
      this.$http.InformationApi.getinformation({ page: 1, pagesize: 3 }).then(
        (res) => {
          console.log("通过page和pagesize查询资讯3", res);
          this.informationList3 = res.data.data;
        }
      );
    },
    //通过医院区，page和pagesize查询医院
    choose(district) {
      console.log(district);
      this.$http.HospitalApi.gethospitalByDistrict({
        district: district,
        page: 1,
        pagesize: 3,
      }).then((res) => {
        console.log("通过医院区，page和pagesize查询医院", res);
        this.hospitalList3 = res.data.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  margin: 0 auto;
  text-align: center;

  ::v-deep .swiper-pagination-bullet-active {
    background-color: #33cccc;
  }

  img {
    width: 100vw;
    height: 500px;
  }
}
.hospital {
  margin: 0px auto;
  width: 1200px;
  height: 800px;
  display: flex;
  justify-content: space-between;
  user-select: none;

  .hs_left {
    width: 900px;
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 80px;
    box-sizing: border-box;

    & > div:first-child {
      display: flex;
      justify-content: space-between;

      & > div > span:hover {
        color: #000;
        font-weight: bold;
      }
      & > span {
        color: #33cccc;
        font-size: 0.9em;

        &:hover {
          font-weight: bold;
        }
      }

      div > span {
        display: inline-block;
        margin-left: 20px;
        color: #333;
        font-size: 0.9em;
      }
    }

    & > div:nth-child(2) {
      display: flex;
    }
    & > div:last-child {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-left: 60px;
      & > p {
        line-height: 40px;
        margin: 0 80px 10px 0;
        width: 170px;
        font-size: 0.9em;
        color: #666;
        &:hover {
          cursor: pointer;
          font-weight: bold;
        }
      }
    }
  }

  .hs_right {
    width: 280px;

    & > div > b {
      display: inline-block;
      margin-top: 40px;
      font-size: 1.3em;
    }
  }
}
.doctor {
  padding-top: 60px;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;

  & > div:first-child {
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    & > b {
      font-size: 1.8em;
    }

    & > p {
      padding: 15px 120px;
      line-height: 25px;
      font-size: 0.8em;
    }
  }
  & > div:nth-child(2) {
    display: flex;
    justify-content: space-between;
  }

  & > p {
    margin: 60px auto;
    width: 180px;
    line-height: 40px;
    border: 1px dotted #333;
    border-radius: 25px;
    text-align: center;
    font-size: 0.9em;
    cursor: pointer;
    &:hover {
      border-style: solid;
    }
  }
}
.information {
  width: 1200px;
  height: 600px;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  user-select: none;

  & > .if_left {
    display: flex;
    flex-direction: column;
    width: 66%;

    & > div:first-child {
      height: 15%;
      font-weight: bold;
      padding: 10px;
      box-sizing: border-box;
    }

    & > div:last-child {
      height: 80%;
      display: flex;
      justify-content: space-between;
    }
  }

  & > .if_right {
    width: 32%;

    & > div:first-child {
      height: 20px;
      padding-top: 40px;
      text-align: right;
      & > span {
        color: #33cccc;
        cursor: pointer;
        &:hover {
          font-weight: bold;
        }
      }
    }

    & > div:last-child {
      height: 90%;
    }
  }
}
.partner {
  width: 1220px;
  height: 450px;
  margin: 80px auto;
  user-select: none;

  & > p {
    height: 20%;
    text-align: center;
    padding: 30px;
    box-sizing: border-box;
    font-weight: bold;
    font-size: 1.8em;
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
</style>
