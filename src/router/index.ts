import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/stores/modules/user";
import { dynamicRoutes } from "./dynamicRoutes";

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
    redirect: "/home/dashboard", // 修改重定向路径
    meta: { hidden: true, title: "首页" },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
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

// 添加全局前置守卫来检查权限
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const userRoles = userStore.role; // 获取用户角色

  if (!userStore.isLoggedIn && to.name !== "Login") {
    next({ name: "Login" });
  } else if (
    userRoles &&
    to.meta.roles &&
    !to.meta.roles.some((role) => userRoles.includes(role))
  ) {
    next({ name: "Unauthorized" }); // 或者重定向到其他页面
  } else {
    next();
  }
});

function checkUserLoggedIn() {
  const token = localStorage.getItem("token");
  // 如果 'token' 存在且不为空，则认为用户已登录
  return token ? true : false;
}

export function addDynamicRoutes(userRoles: string[]) {
  console.log("dynamicRoutes", dynamicRoutes);
  console.log(userRoles);

  dynamicRoutes.forEach((route) => {
    if (
      route.meta &&
      route.meta.roles.some((role) => userRoles.includes(role))
    ) {
      if (!router.hasRoute(route.name)) {
        router.addRoute(route);
      }
    }
  });
}

/* 导出 Router */
export default router;
