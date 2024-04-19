export default [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
    redirect: "/home/dashboard",
    children: [
      {
        path: "/home/dashboard",
        name: "Dashboard",
        meta: {
          hidden: true,
          title: "首页",
          roles: ["user", "admin"],
          icon: "dashboard",
        },
        component: () => import("@/views/dashboard/index.vue"),
      },
      {
        path: "/home/product",
        name: "Product",
        meta: {
          requiresAuth: true,
          roles: ["user", "admin"],
          title: "商品管理",
          icon: "product",
        },
        children: [
          {
            path: "/home/product/list",
            name: "List",
            meta: {
              requiresAuth: true,
              roles: ["user", "admin"],
              title: "商品列表",
            },
            component: () => import("@/views/product/list/index.vue"),
          },
          {
            path: "/home/product/record",
            name: "Record",
            meta: {
              requiresAuth: true,
              roles: ["user", "admin"],
              title: "商品记录",
            },
            component: () => import("@/views/product/record/index.vue"),
          },
          {
            path: "/home/product/service",
            name: "Service",
            meta: {
              requiresAuth: true,
              roles: ["user", "admin"],
              title: "预约服务",
            },
            component: () => import("@/views/product/service/index.vue"),
          },
        ],
      },
      {
        path: "/home/order",
        name: "Order",
        meta: {
          requiresAuth: true,
          roles: ["user", "admin"],
          title: "订单管理",
          icon: "order",
        },
        component: () => import("@/views/order/index.vue"),
      },
      {
        path: "/home/pet",
        name: "Pet",
        meta: {
          requiresAuth: true,
          roles: ["user", "admin"],
          title: "宠物管理",
          icon: "pet",
        },
        children: [
          {
            path: "/home/pet/list",
            name: "PetList",
            meta: {
              requiresAuth: true,
              roles: ["user", "admin"],
              title: "宠物列表",
            },
            component: () => import("@/views/pet/list/index.vue"),
          },
          {
            path: "/home/pet/warning",
            name: "PetWarning",
            meta: {
              requiresAuth: true,
              roles: ["user", "admin"],
              title: "提示服务",
            },
            component: () => import("@/views/pet/warning/index.vue"),
          },
        ],
      },
      {
        path: "/home/vip",
        name: "Vip",
        component: () => import("@/views/vip/index.vue"),
        meta: {
          requiresAuth: true,
          roles: ["user", "admin"],
          title: "顾客管理",
          icon: "vip",
        },
      },
      {
        path: "/home/workers",
        name: "Workers",
        component: () => import("@/views/workers/index.vue"),
        meta: {
          requiresAuth: true,
          roles: ["admin"],
          title: "员工管理",
          icon: "workers",
        },
      },
      {
        path: "/home/digital",
        name: "Digital",
        component: () => import("@/views/digital/index.vue"),
        meta: {
          requiresAuth: true,
          roles: ["user", "admin"],
          title: "数据中心",
          icon: "digital",
        },
      },
    ],
  },
];
