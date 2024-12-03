import { $http } from "@/utils/http2";
export const getModelApi = () => {
    return $http({
        url: "openai/model",
        method: "get",
    });
};

export const toggleModelApi = (model_id: number) => {
    return $http({
        url: `openai/toggle/${model_id}`,
        method: "get",
    });
};