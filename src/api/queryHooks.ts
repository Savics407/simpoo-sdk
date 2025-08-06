import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createApiClient } from "./client";
import { useSDK } from "../context/SimpooProvider";

type CustomError = {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
    statusText?: string;
  };
  request?: any; // You can adjust this type as needed
  message?: string;
};

const { apiKey } = useSDK();
const api = createApiClient(apiKey || "");

export const fetchData = async (url: any) => {
  try {
    const { data } = await api.get(url);
    return data as any;
  } catch (error) {
    handleAxiosError(error as CustomError);
  }
};

export const useFetchData = (key: Array<string>, url: string, options = {}) => {
  return useQuery({
    queryKey: key,
    queryFn: () => fetchData(url),
    ...options,
  });
};

const deleteData = async ({ url, payload }: { url: string; payload?: any }) => {
  const { data } = await api.delete(url, payload);
  return data;
};

export const useDeleteData = (options = {}) => {
  return useMutation({
    mutationFn: deleteData,
    onSuccess(data: any, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      handleAxiosError(error);
    },
    ...options,
  });
};

export const postData = async ({
  url,
  payload,
}: {
  url: string;
  payload?: any;
}) => {
  const { data } = await api.post(url, payload);
  return data;
};

export const postFormData = async ({
  url,
  payload,
}: {
  url: string;
  payload?: any;
}) => {
  const { data } = await api.post(url, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const usePostData = (
  options = { enableToast: true },
  formData?: boolean,
  download?: boolean
) => {
  const { enableToast, ...restOptions } = options;
  return useMutation({
    mutationFn: formData ? postFormData : postData,
    onSuccess(data: any, variables, context) {
      if (enableToast) {
        toast.success(data.message);
      }
    },
    onError(error, variables, context) {
      console.log(error);
      handleAxiosError(error);
    },
    ...restOptions,
  });
};

export const handleAxiosError = (error: CustomError) => {
  if (error?.response) {
    console.log("response data:", error.response.data);
    console.log("Status Code:", error.response.status);
    console.log("Status Text:", error.response.statusText);

    // Check for 500 status and throw custom error message

    if (error.response.status === 500) {
      toast.error(`Something went wrong`, {
        position: "top-right",
      });
    } else if (error.response.data && error.response.data.message) {
      toast.error(`${error.response?.data?.message}`, {
        position: "top-right",
      });
    }
  } else if (error.request) {
    console.log(error?.message);
    toast.error(`${error?.message}`, {
      position: "top-right",
    });
  } else {
    console.log(error?.message);
    toast.error(`${error?.message}`, {
      position: "top-right",
    });
  }
};
