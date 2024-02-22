import type { App } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true, title: "登录" },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
    redirect: "/dashboard",
    meta: { hidden: true, title: "首页" },
    children: [
      {
        path: "/dashboard",
        name:"Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
      },
      {
        path: "/product",
        name: "Product",
        children: [
          {
            path: "/product/list",
            name:'List',
            component: () => import("@/views/product/list/index.vue"),
          },
          {
            path: "/product/record",
            name:'Record',
            component: () => import("@/views/product/record/index.vue"),
          },
          {
            path: "/product/service",
            name:'Service',
            component: () => import("@/views/product/service/index.vue"),
          },

        ],
      },
      {
        path: "/order",
        name: "Order",
        component: () => import("@/views/order/index.vue"),
      },
      {
        path: "/pet",
        name: "Pet",
        children: [
          {
            path: "/pet/list",
            name:'PetList',
            component: () => import("@/views/pet/list/index.vue"),
          },
          {
            path: "/pet/warning",
            name:'PetWarning',
            component: () => import("@/views/pet/warning/index.vue"),
          },
        ],
      },
      {
        path: "/vip",
        name: "VIP",
        component: () => import("@/views/vip/index.vue"),
      },
      {
        path: "/workers",
        name: "Workers",
        component: () => import("@/views/workers/index.vue"),
      },
      {
        path: "/digital",
        name: "Digital",
        component: () => import("@/views/digital/index.vue"),
      },
    ],
  },

  {
    path: "/test",
    name: "Test",
    component: () => import("@/components/test/index.vue"),
    meta: { hidden: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/* 初始化路由表 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}
/* 导出 setupRouter */
export const setupRouter = (app: App<Element>) => {
  app.use(router);
};
