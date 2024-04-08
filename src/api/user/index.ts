import request from "../../utils/request";
import type { loginForm, loginResponseData, userInfoResponseData } from "./type";

enum API {
    LOGIN_URL = "/user/login",
    USERINFO_URL = "/user/info",
    LOGOUT_URL = "/admin/acl/index/logout",
    REGISTER_URL = "/user/register"
}

export const reqLogin = (data: loginForm) => request.post<loginResponseData>(API.LOGIN_URL, data)
export const reqUserInfo = () => request.get<userInfoResponseData>(API.USERINFO_URL)
export const reqLotout = () => request.post(API.LOGOUT_URL)
export const reqRegister = (data: loginForm)=> request.post<loginResponseData>(API.REGISTER_URL, data)