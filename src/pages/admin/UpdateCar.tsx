import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RingLoader } from "react-spinners";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import {
  useGetAllCarDataQuery,
  useUpdateCarMutation,
} from "../../redux/features/carManagement/carApi";
import { Car, CarFormData } from "../../constants/type";

const UpdateCar = () => {
  const { data: allCarData } = useGetAllCarDataQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    // pollingInterval: 60000,
  });

  const [updateCar, { data, error }] = useUpdateCarMutation();

  console.log({ data, error });

  const { id } = useParams();
  //   console.log(id);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CarFormData>();

  const matchCar = allCarData?.data?.find((item: Car) => item?._id === id);
  //   console.log(matchcar);

  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<CarFormData> = async (data) => {
    try {
      setLoading(true);

      const carData = {
        CarId: id,
        CarInfo: {
          ...data,
          price: Number(data.price), // ✅ convert string to number
          stock: Number(data.stock),
        },
      };
      // console.log(carData);

      const result = await updateCar(carData).unwrap();
      // console.log(result);
      toast.success(result.message, { duration: 2000 });
      reset();
      setLoading(false);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("something went wrong..", { duration: 2000 });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <RingLoader size={80} color="#1ca944" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10  px-4">
      <div className="max-w-4xl w-full text-white rounded-lg shadow-lg p-8 md:p-12 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-center mb-6">
          Update Car to Sell
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-md font-medium mb-2">Title</label>
            <input
              defaultValue={matchCar?.name}
              {...register("name", { required: "Title is required" })}
              type="text"
              placeholder="Enter car title"
              className={`w-full px-4 py-2 text-white rounded-lg border ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
              } focus:outline-none focus:ring-2`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">Title is required</p>
            )}
          </div>

          <div>
            <label className="block text-md font-medium mb-2">Brand</label>
            <input
              defaultValue={matchCar?.brand}
              {...register("brand", { required: "Brand is required" })}
              type="text"
              placeholder="Enter car brand"
              className={`w-full px-4 py-2 text-white rounded-lg border ${
                errors.brand
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
              } focus:outline-none focus:ring-2`}
            />
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">Brand is required</p>
            )}
          </div>
          <div>
            <label className="block text-md font-medium mb-2">Model</label>
            <input
              defaultValue={matchCar?.model}
              {...register("model", { required: "Model is required" })}
              type="text"
              placeholder="Enter car model"
              className={`w-full px-4 py-2 text-white rounded-lg border ${
                errors.model
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
              } focus:outline-none focus:ring-2`}
            />
            {errors.model && (
              <p className="text-red-500 text-sm mt-1">Model is required</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-md font-medium mb-2">Stock</label>
              <input
                defaultValue={matchCar?.stock}
                {...register("stock", {
                  required: "Stock is required",
                })}
                type="number"
                placeholder="Stock quantity"
                className={`w-full px-4 py-2 text-white rounded-lg border ${
                  errors.stock
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-700 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">Stock is required</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-md font-medium mb-2">
              Car Category
            </label>
            <select
              defaultValue={matchCar?.carCategory}
              id="carCategory"
              className={`w-full px-4 py-2 cursor-pointer text-white rounded-lg border ${
                errors.category
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
              } focus:outline-none focus:ring-2`}
              {...register("category", { required: "Category is required" })}
            >
              <option value="" disabled>
                --Select a Category--
              </option>
              <option className=" text-black" value="Sedan">
                Sedan
              </option>
              <option className=" text-black" value="SUV">
                SUV
              </option>
              <option className=" text-black" value="Hatchback">
                Hatchback{" "}
              </option>
              <option className=" text-black" value="Coupe">
                Coupe{" "}
              </option>
              <option className=" text-black" value="Convertible">
                Convertible{" "}
              </option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">Category is required</p>
            )}
          </div>

          <div>
            <label className="block text-md font-medium mb-2">Price</label>
            <input
              defaultValue={matchCar?.price}
              {...register("price", { required: "Price is required" })}
              type="number"
              placeholder="Price"
              className={`w-full px-4 py-2 text-white rounded-lg border ${
                errors.price
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
              } focus:outline-none focus:ring-2`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">Price is required</p>
            )}
          </div>

          <div>
            <label className="block text-md font-medium mb-2">
              Description
            </label>
            <textarea
              defaultValue={matchCar?.description}
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter car description"
              className={`w-full px-4 py-2 text-white rounded-lg border ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
              } focus:outline-none focus:ring-2`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                Description is required
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none"
          >
            Update Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;
