import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { GetAllUserType } from "./types";
import axios from "axios";

export const getalluser = {
  useQuery: (
    opt?: Partial<UseQueryOptions<unknown, Error, Array<GetAllUserType>>>,
    onError?: () => void
  ) => {
    return useQuery({
      queryKey: ["getAllUsers"],
      queryFn: async () => {
        try {
          const response = await axios.get("User/UserLogin");
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