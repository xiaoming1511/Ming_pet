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
    meta: { hidden: true, title: "登录" },
  },
];
