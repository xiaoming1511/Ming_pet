import { defineStore } from "pinia";
import store from "../index";
import { Nullable } from "element-plus/es/components/cascader-panel/src/node";
import loginService from "@/api/loginService";
import { LogOut } from "@vicons/ionicons5";
import { update } from "lodash";

type UserInfo = {
  roleName: string;
};
type UserState = {
  userInfo: Nullable<UserInfo>;
  token?: string;
};
export const useUserStore = defineStore({
  id: "user",
  // ref变量 → state 属性
  state: (): UserState => ({
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
    token: localStorage.getItem("token") || "",
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    getUserInfo(): Nullable<UserInfo> {
      return this.userInfo;
    },
  },

  actions: {
    // 登录动作
    async login(credentials: { username: string; password: string }) {
      try {
        const request = await loginService.login(credentials);
        if (request.code == 200) {
          this.userInfo = request.data.userInfo;
          this.token = request.data.token;
          localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
          localStorage.setItem("token", this.token);
          ElMessage.success(request.msg);
        } else {
          ElMessage.warning(request.msg);
        }
      } catch (error) {
        console.error("登录请求失败:", error);
        throw error;
      }
    },
    async LogOut() {
      try {
        const request = await loginService.logout();
        this.userInfo = null;
        this.token = null;
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        ElMessage.success("退出成功");
      } catch (error) {
        console.error("退出登录请求失败:", error);
        throw error;
      }
    },
    async register(data) {
      try {
        const request = await loginService.register(data);
        if (request.code === 200) {
          ElMessage.success("注册成功");
        } else {
          ElMessage.warning(request.msg);
        }
      } catch (error) {
        ElMessage.error("注册请求失败");
        console.error("注册请求失败:", error);
      }
    },
    async updateUserInfo(id, data) {
      try {
        return await loginService.updatedUserInfo(id, data);
      } catch (error) {
        ElMessage.error("修改请求失败");
        console.error("修改请求失败:", error);
      }
    },
  },
});

export function useUserStoreWidthOut() {
  return useUserStore(store);
}
