import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { useUserStore, useUserStoreWidthOut } from "@/stores/modules/user";
import { basicRoutes } from "./basic";

type RouteRecordRawT = RouteRecordRaw & {
  meta?: {
    roles?: string[];
  };
};

const modules = import.meta.glob("./modules/**/*.ts", { eager: true });

const routerModuleList: Array<RouteRecordRaw> = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : mod;
  routerModuleList.push(...modList);
});

export const routes: Array<RouteRecordRawT> = [
  ...basicRoutes,
  ...routerModuleList,
];
// console.error(routes);
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

export function resetAuthRouter() {
  const userStore = useUserStoreWidthOut();
  resetRouter();
  const realUserInfo = userStore.getUserInfo;
  let listFilter = (list: Array<RouteRecordRawT>) => {
    return list
      .map((node) => {
        return { ...node };
      })
      .filter((node) => {
        const { children, meta } = node;
        if (Array.isArray(children)) {
          node.children = listFilter(children);
        }
        return (
          !meta ||
          !meta.roles ||
          meta.roles.includes(realUserInfo?.roleName || "")
        );
      });
  };
  const routes = listFilter([...basicRoutes, ...routerModuleList]);
  routes.forEach((route) => {
    router.addRoute(route);
  });
}

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStoreWidthOut();
  const isLoggedIn = userStore.isLoggedIn; // 假设你有一个getter来检查用户是否登录
  const userInfo = userStore.getUserInfo; // 获取用户信息

  const isPublic = to.matched.some((record) => record.meta.requiresAuth);

  if (isPublic) {
    // 检查路由是否需要认证
    if (!isLoggedIn) {
      // 用户未登录，重定向到登录页面，并携带要重定向的路由路径
      next({ name: "Login", query: { redirect: to.fullPath } });
    } else if (to.meta.roles && !to.meta.roles.includes(userInfo.roleName)) {
      // 用户没有权限访问当前路由，重定向到无权限页面
      next({ name: "Prohibition" });
    } else {
      // 用户已登录且有权限，放行
      next();
    }
  } else {
    // 路由不需要认证，直接放行
    next();
  }
});

/* 导出 setupRouter */
export const setupRouter = (app: App<Element>) => {
  app.use(router);
};
