import request from "../../utils/request";
import type { loginForm, loginResponseData, userInfoResponseData } from "./type";

enum API {
    LOGIN_URL = "/admin/acl/index/login",
    USERINFO_URL = "/admin/acl/index/info",
    LOGOUT_URL = "/admin/acl/index/logout"
}

export const reqLogin = (data: loginForm) => request.post<loginResponseData>(API.LOGIN_URL, data)
export const reqUserInfo = () => request.get<userInfoResponseData>(API.USERINFO_URL)
export const reqLotout = () => request.post(API.LOGOUT_URL)
