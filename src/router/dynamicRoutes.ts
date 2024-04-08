import { RouteRecordRaw } from "vue-router";

export const adminRoutes: Array<RouteRecordRaw> = [
  {
    path: "/workers",
    name: "Workers",
    component: () => import("@/views/workers/index.vue"),
    meta: { requiresAuth: true, roles: ["admin"] },
  },
];

export const userRoutes: Array<RouteRecordRaw> = [
  {
    path: "/pet",
    name: "Pet",
    meta: { requiresAuth: true, roles: ["user", "admin"] },
    children: [
      {
        path: "list",
        name: "PetList",
        component: () => import("@/views/pet/list/index.vue"),
      },
      {
        path: "warning",
        name: "PetWarning",
        component: () => import("@/views/pet/warning/index.vue"),
      },
    ],
  },
  {
    path: "/product",
    name: "Product",
    children: [
      {
        path: "/product/list",
        name: "List",
        component: () => import("@/views/product/list/index.vue"),
      },
      {
        path: "/product/record",
        name: "Record",
        component: () => import("@/views/product/record/index.vue"),
      },
      {
        path: "/product/service",
        name: "Service",
        component: () => import("@/views/product/service/index.vue"),
      },
    ],
  },
  {
    path: "/vip",
    name: "VIP",
    meta: { requiresAuth: true, roles: ["user", "admin"] },
    component: () => import("@/views/vip/index.vue"),
  },
  {
    path: "/order",
    name: "Order",
    meta: { requiresAuth: true, roles: ["user", "admin"] },
    component: () => import("@/views/order/index.vue"),
  },
];
