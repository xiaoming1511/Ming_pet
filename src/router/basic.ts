export const basicRoutes = [
  {
    path: "/",
    redirect: "/login",
    name: "Root",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true,
      title: "登录",
      roles: ["user", "admin"],
    },
  },
  {
    path: "/prohibition",
    name: "Prohibition",
    component: () => import("@/views/Result/prohibition.vue"),
    meta: {
      hidden: true,
      title: "禁止访问",
      roles: ["user", "admin"],
    },
  },
];
