import { SaleType } from "@/shared/types";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import axios from "axios";
import { SellProduct, SaleReport } from "./types";

export const getallsale = {
  useQuery: (
    opt?: Partial<UseQueryOptions<unknown, Error, Array<SaleType>>>,
    onError?: () => void
  ) => {
    return useQuery({
      queryKey: ["getAllSale"],
      queryFn: async () => {
        try {
          const response = await axios.get("Sale/GetAllSale");
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

export const getsalereport = {
  useQuery: (
    opt?: Partial<UseQueryOptions<unknown, Error, SaleReport>>,
    onError?: () => void
  ) => {
    return useQuery({
      queryKey: ["getSaleReport"],

      queryFn: async () => {
        try {
          const response = await axios.get("Sale/SaleReport");
          // const { data, status } = response.data;
          // console.log(response.data);
          // if (status !== 0) {
          //   onError?.();
          //   return new Error("Error While Fetching");
          // }
          // console.log(data);
          return response.data;
          
        } catch {
          throw new Error("Error While Fetching");
        }
      },
   
      
      ...opt,
    });
  },
};




export const addsellProduct = {
  useMutation: (
    opt?: UseMutationOptions<unknown, Error, SellProduct[], unknown>
  ) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["addsellProduct"],
      mutationFn: (payload: SellProduct[]) => {
        return axios.post("Sale/SellProduct", payload);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["SaleReport"],
        });
      },
      ...opt,
    });
  },
};

