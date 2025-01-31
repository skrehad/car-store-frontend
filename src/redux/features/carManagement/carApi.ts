import { baseApi } from "../../api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCar: builder.mutation({
      query: (carInfo) => ({
        url: "/api/car/create-car",
        method: "POST",
        body: carInfo,
      }),
    }),
    getAllCarData: builder.query({
      query: () => ({
        url: "/api/car",
      }),
    }),
    deleteCar: builder.mutation({
      query: (data) => ({
        url: `/api/car/${data.id}`,
        method: "DELETE",
        body: data,
      }),
    }),
    updateCar: builder.mutation({
      query: (data) => ({
        url: `/api/car/${data.CarId}`,
        method: "PATCH",
        body: data.CarInfo,
      }),
    }),
  }),
});

export const {
  useAddCarMutation,
  useGetAllCarDataQuery,
  useDeleteCarMutation,
  useUpdateCarMutation,
} = carApi;
