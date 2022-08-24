import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home/index",
  },
  {
    path: "/home",
    component: () => import("../views/HomeView.vue"),
    children: [
      {
        path: "index",
        component: () => import("../views/index/IndexShow.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "hospital",
        component: () => import("../views/hospital/HospitalShow.vue"),
        meta: {
          title: "医院",
        },
      },
      {
        path: "doctor",
        component: () => import("../views/doctor/DoctorShow.vue"),
        meta: {
          title: "医生",
        },
      },
      {
        path: "information",
        component: () => import("../views/information/InformationShow.vue"),
        meta: {
          title: "资讯",
        },
      },
      {
        path: "aboutUs",
        component: () => import("../views/aboutUs/AboutUsShow.vue"),
        meta: {
          title: "关于我们",
        },
      },
      {
        path: "hospital_detail/:id",
        component: () => import("../views/hospital/HospitalDetail.vue"),
        meta: {
          title: "详情",
        },
        redirect: "/home/hospital_detail/:id/information",
        children: [
          {
            path: "information",
            component: () => import("../views/hospital/Detaileinformation.vue"),
          },
          {
            path: "environment",
            component: () => import("../views/hospital/DetaileEnvironment.vue"),
          },
        ],
      },
      {
        path: "doctor_detail/:id",
        component: () => import("../views/doctor/DoctorDetail.vue"),
        meta: {
          title: "详情",
        },
      },
      {
        path: "information_detail/:id",
        component: () => import("../views/information/InformationDetail.vue"),
        meta: {
          title: "详情",
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../views/user/Login.vue"),
    meta: {
      title: "登录 — 佳美口腔",
    },
  },
  {
    path: "/register",
    component: () => import("../views/user/Register.vue"),
    meta: {
      title: "注册 — 佳美口腔",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});
export default router;
