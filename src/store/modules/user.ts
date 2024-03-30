import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLotout, reqRegister } from "../../api/user";
import { constantRoute } from "../../router/routes";
import { loginForm } from "../../api/user/type";

let useUserStore = defineStore("User", {
  state: () => {
    return {
      token: localStorage.getItem("TOKEN"),
      menuRoutes: constantRoute,
      username: "",
      avatar: "",
    };
  },
  actions: {
    async login(data: loginForm) {
      const result = await reqLogin(data);
      if (result.code === 200) {
        this.token = result.data;
        localStorage.setItem("TOKEN", result.data as string);
        return "ok";
      } else {
        return Promise.reject(new Error(result.data));
      }
    },
    async userInfo() {
      let result = await reqUserInfo();
      if (result.code === 200) {
        this.username = result.data.name;
        this.avatar = result.data.avatar;
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async userLogout() {
      // const result = await reqLotout();
      // if (result.code === 200) {
      //     this.token = '';
      //     this.username = '';
      //     this.avatar = '';
      //     localStorage.removeItem('TOKEN')
      //     return 'ok'
      // }else{
      //     return Promise.reject(new Error(result.message))
      // }
      this.token = "";
      this.username = "";
      this.avatar = "";
      localStorage.removeItem("TOKEN");
      return "ok";
    },
    async register(data: loginForm) {
      const result = await reqRegister(data);
      if (result.code === 200) {
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
  },
  getters: {},
});

export default useUserStore;
