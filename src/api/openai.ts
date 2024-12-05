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

export const getSessionApi = (user_id: number) => {
  return $http({
    url: `openai/session/${user_id}`,
    method: "get",
  });
};
