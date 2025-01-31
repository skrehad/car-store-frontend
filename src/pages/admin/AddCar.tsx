/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAppSelector } from "../../redux/features/hook";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAddCarMutation } from "../../redux/features/carManagement/carApi";
import { CarData, User } from "../../constants/type";

const AddCar = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CarData>();

  const user = useAppSelector(useCurrentUser) as User;

  const [addCar] = useAddCarMutation(undefined);

  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<CarData> = async (data) => {
    try {
      setLoading(true);
      const image = data?.image ? data.image[0] : null; // Ensure this is correct
      const newFormData = new FormData();
      if (image) {
        // const newFormData = new FormData();
        newFormData.append("file", image);
      } // Add the image file
      newFormData.append("upload_preset", "md_rehad"); // Your upload preset
      newFormData.append("cloud_name", "dz43bufkc"); // Not necessary for the request

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dz43bufkc/image/upload",
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.url;
      const { name, brand, model, category, description } = data;
      const carData = {
        name,
        brand,
        model,
        year: Number(data.year),
        description,
        stock: Number(data.stock),
        price: Number(data.price),
        image: imageUrl,
        userName: user?.name,
        userEmail: user?.email,
        availability: true,
        category,
      };
      // console.log(user);
      await addCar(carData).unwrap();
      toast.success("Car Data Added Successfully", { duration: 2000 });
      reset();
      console.log(carData);

      setLoading(false);
    } catch (error: any) {
      const errors = error?.data?.errorSources || [
        "An unexpected error occurred",
      ];
      // console.log(errors.forEach(error(error.massage)));
      errors.forEach((error: { path: string; message: string }) => {
        toast.error(` ${error.path}: ${error.message}`); // Log only the error message
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10  px-4">
      <div className="max-w-4xl w-full text-white rounded-lg shadow-lg p-8 md:p-12 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-center mb-6">
          Add a Car to Sell
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-md font-medium mb-2">Title</label>
            <input
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
          <div>
            <label className="block text-md font-medium mb-2">Year</label>
            <input
              {...register("year", { required: "Year is required" })}
              type="number"
              placeholder="Enter year"
              className={`w-full px-4 py-2 text-white rounded-lg border ${
                errors.year
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
              } focus:outline-none focus:ring-2`}
            />
            {errors.year && (
              <p className="text-red-500 text-sm mt-1">Year is required</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-md font-medium mb-2">Stock</label>
              <input
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

            <div>
              <label className="block text-md font-medium mb-2">Image</label>
              {loading ? (
                <p>Uploading, please wait...</p>
              ) : (
                <input
                  {...register("image", { required: "Image is required" })}
                  type="file"
                  accept="image/*"
                  className={`w-full px-4 py-2 text-white rounded-lg border ${
                    errors.image
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-700 focus:ring-blue-500"
                  } focus:outline-none focus:ring-2`}
                />
              )}
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">Image is required</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-md font-medium mb-2">
              Car Category
            </label>
            <select
              id="carCategory"
              className={`w-full px-4 py-2 cursor-pointer text-white rounded-lg border ${
                errors.category
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
              } focus:outline-none focus:ring-2`}
              {...register("category", { required: "Category is required" })}
              defaultValue="" // Use defaultValue for the default selection
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
            className="w-full  cursor-pointer px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none"
          >
            Add Car To Display
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
