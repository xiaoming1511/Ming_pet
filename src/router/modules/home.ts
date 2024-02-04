export default [
  {
    path: "/home",
    name: "homeIndex",
    component: () => import("../../views/home/index.vue"),
    meta: {
      title: "首页",
    },
  },
];
