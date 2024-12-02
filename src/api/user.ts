import { $http } from "@/utils/http";

export const loginApi = (data: any) => {
    return $http({
        url: "auth/login",
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
        data,
    });
};

export const registerApi = (data: any) => {
    return $http({
        url: "auth/register",
        method: "post",
        data,
    });
};

export const getUserInfoApi = () => {
    return $http({
        url: "auth/me",
        method: "get",
    });
};