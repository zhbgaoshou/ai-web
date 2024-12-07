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

// 获取会话
export const getSessionApi = (
  user_id: number,
  pageParam: { page: number; page_size: number }
) => {
  return $http({
    url: `openai/session/${user_id}`,
    method: "get",
    params: pageParam,
  });
};

// 删除会话
export const deleteSessionApi = (session_id: number) => {
  return $http({
    url: `openai/session/${session_id}`,
    method: "delete",
  });
};
