import type { App } from "vue";
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

/* 导出 setupRouter */
export const setupRouter = (app: App<Element>) => {
  app.use(router);
};
