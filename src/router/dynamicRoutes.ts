export const dynamicRoutes = [
  {
    path: "/product",
    name: "Product",
    meta: { roles: ["user", "admin"] }, // 用户和管理员均可访问
    children: [
      {
        path: "list", // 修改为相对路径
        name: "List",
        component: () => import("@/views/product/list/index.vue"),
      },
      {
        path: "record", // 修改为相对路径
        name: "Record",
        component: () => import("@/views/product/record/index.vue"),
      },
      {
        path: "service", // 修改为相对路径
        name: "Service",
        component: () => import("@/views/product/service/index.vue"),
      },
    ],
  },
  {
    path: "/order",
    name: "Order",
    meta: { roles: ["user", "admin"] },
    component: () => import("@/views/order/index.vue"),
  },
  {
    path: "/pet",
    name: "Pet",
    meta: { roles: ["user", "admin"] }, // 用户和管理员均可访问
    children: [
      {
        path: "list", // 修改为相对路径
        name: "PetList",
        component: () => import("@/views/pet/list/index.vue"),
      },
      {
        path: "warning", // 修改为相对路径
        name: "PetWarning",
        component: () => import("@/views/pet/warning/index.vue"),
      },
    ],
  },
  {
    path: "/vip",
    name: "VIP",
    meta: { roles: ["user", "admin"] },
    component: () => import("@/views/vip/index.vue"),
  },
  {
    path: "/workers",
    name: "Workers",
    meta: { roles: ["admin"] }, // 仅管理员可访问
    component: () => import("@/views/workers/index.vue"),
  },
  {
    path: "/digital",
    name: "Digital",
    meta: { roles: ["user", "admin"] },
    component: () => import("@/views/digital/index.vue"),
  },
];
