import request from "@/utils/request";

export const reqGetFileList = () => request.get<any>("/file")
