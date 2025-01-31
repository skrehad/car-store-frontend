import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (carInfo) => ({
        url: "/order",
        method: "POST",
        body: carInfo,
      }),
    }),
    getAdminOrdersData: builder.query({
      query: (userInfo) => ({
        url: "/payment/get-order-data",
        method: "PUT",
        body: { email: userInfo?.email },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getUserOrdersData: builder.query({
      query: (userInfo) => ({
        url: `/payment/get-order-data`,
        method: "PUT",
        body: { email: userInfo?.email },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    acceptOrder: builder.mutation({
      query: (carInfo) => ({
        url: "/payment/accept-order",
        method: "PUT",
        body: carInfo,
      }),
    }),
    cancelOrder: builder.mutation({
      query: (carInfo) => ({
        url: "/payment/cancel-order",
        method: "PUT",
        body: carInfo,
      }),
    }),
    deleteOrder: builder.mutation({
      query: (orderInfo) => ({
        url: "/payment/delete-order",
        method: "PUT",
        body: orderInfo,
      }),
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetAdminOrdersDataQuery,
  useGetUserOrdersDataQuery,
  useAcceptOrderMutation,
  useCancelOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
