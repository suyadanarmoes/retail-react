import {
    useMutation,
    UseMutationOptions,
    useQuery,
    useQueryClient,
    UseQueryOptions,
  } from "@tanstack/react-query";
  import axios from "axios";
  import { DeleteProduct, UpdateProduct } from "./types";
  import { ProductType } from "@/shared/types";
  
  export const fetchStocks = {
    useQuery: (
      opt?: Partial<UseQueryOptions<unknown, Error, Array<ProductType>>>,
      onError?: () => void
    ) => {
      return useQuery({
        queryKey: ["getAllProducts"],
        queryFn: async () => {
          try {
            const response = await axios.get("Product/GetAllProduct");
            const { data, status } = response.data;
  
            if (status !== 0) {
              onError?.();
              return new Error("Error While Fetching");
            }
            return data;
          } catch {
            throw new Error("Error While Fetching");
          }
        },
        ...opt,
      });
    },
  };
  
  export const addProduct = {
    useMutation: (
      opt?: UseMutationOptions<unknown, Error, UpdateProduct, unknown>
    ) => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationKey: ["addProduct"],
        mutationFn: (payload: UpdateProduct) => {
          return axios.post("Product/AddProduct", payload);
        },
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["getAllProducts"],
          });
        },
        ...opt,
      });
    },
  };
  
  export const updateProduct = {
    useMutation: (
      opt?: UseMutationOptions<unknown, Error, UpdateProduct, unknown>
    ) => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationKey: ["updateProduct"],
        mutationFn: (payload: UpdateProduct) => {
          return axios.put("Product/UpdateProduct", payload);
        },
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["getAllProducts"],
          });
        },
        ...opt,
      });
    },
  };
  
  export const deleteProduct = {
    useMutation: (
      opt?: UseMutationOptions<unknown, Error, DeleteProduct, unknown>
    ) => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationKey: ["DeleteProduct"],
        mutationFn: (DeleteProductType) => {
          return axios.delete("Product/DeleteProduct", {
            data: DeleteProductType,
          });
        },
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["getAllProducts"],
          });
        },
        ...opt,
      });
    },
  };