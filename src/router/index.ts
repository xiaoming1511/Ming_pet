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
