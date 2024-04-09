export default [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
    meta: { title: "首页" },
    redirect: "/home/dashboard",
    children: [
      {
        path: "/home/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
      },
      {
        path: "/home/product",
        name: "Product",
        redirect: "/home/product/list",
        children: [
          {
            path: "/home/product/list",
            name: "List",
            component: () => import("@/views/product/list/index.vue"),
          },
          {
            path: "/home/product/record",
            name: "Record",
            component: () => import("@/views/product/record/index.vue"),
          },
          {
            path: "/home/product/service",
            name: "Service",
            component: () => import("@/views/product/service/index.vue"),
          },
        ],
      },
      {
        path: "/home/order",
        name: "Order",
        meta: { requiresAuth: true, roles: ["user", "admin"] },
        component: () => import("@/views/order/index.vue"),
      },
      {
        path: "/home/pet",
        name: "Pet",
        meta: { requiresAuth: true, roles: ["user", "admin"] },
        redirect: "/home/pet/list",
        children: [
          {
            path: "/home/pet/list",
            name: "PetList",
            component: () => import("@/views/pet/list/index.vue"),
          },
          {
            path: "/home/pet/warning",
            name: "PetWarning",
            component: () => import("@/views/pet/warning/index.vue"),
          },
        ],
      },
      {
        path: "/home/vip",
        name: "Vip",
        component: () => import("@/views/vip/index.vue"),
        meta: { requiresAuth: true, roles: ["user", "admin"] },
      },
      {
        path: "/home/workers",
        name: "Workers",
        component: () => import("@/views/workers/index.vue"),
        meta: { requiresAuth: true, roles: ["admin"] },
      },
    ],
  },
];
