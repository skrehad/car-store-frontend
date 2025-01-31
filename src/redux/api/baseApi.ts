import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { RootState } from "../features/store";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    const message = (result.error.data as { message: string })?.message;
    toast.error(message);
  }
  if (result?.error?.status === 403) {
    const message = (result.error.data as { message: string })?.message;
    toast.error(message);
  }

  // status code 401 is returned from backend server where i use 401 for unauthorized
  if (result?.error?.status === 401) {
    //* Send Refresh
    // console.log("Sending refresh token");

    // set token after token has expired by refreshing token
    const res = await fetch("http://localhost:4000/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
