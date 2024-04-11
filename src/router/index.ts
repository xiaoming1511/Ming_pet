import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { useUserStoreWidthOut } from "@/stores/modules/user";
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

// 路由守卫
// router.beforeEach((to, from, next) => {
//   const userStore = useUserStoreWidthOut();
//   // 检查用户是否已经登录（假设token存储在Pinia的userStore或localStorage中）
//   const hasToken = userStore.token || localStorage.getItem('token');

//   if (hasToken) {
//     if (to.path === '/login') {
//       // 如果已登录且目标路径是登录页，跳转到首页
//       next({ path: '/' });
//     } else {
//       // 如果已登录且目标路径不是登录页，直接前往目标页面
//       next();
//     }
//   } else {
//     if (to.meta.roles) {
//       // 如果目标路由需要权限，而用户没有token，则重定向到登录页面
//       next(`/login?redirect=${to.path}`);
//     } else {
//       // 如果目标路由不需要权限，任何用户都可以访问
//       next();
//     }
//   }
// });

/* 导出 setupRouter */
export const setupRouter = (app: App<Element>) => {
  app.use(router);
};
