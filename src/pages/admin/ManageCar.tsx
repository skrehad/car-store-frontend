/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RingLoader } from "react-spinners";
import {
  useDeleteCarMutation,
  useGetAllCarDataQuery,
} from "../../redux/features/carManagement/carApi";
import { useAppSelector } from "../../redux/features/hook";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { Car } from "../../constants/type";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ManageCar = () => {
  const { data, isLoading } = useGetAllCarDataQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [deleteCar] = useDeleteCarMutation();

  const user = useAppSelector(useCurrentUser);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <RingLoader size={80} color="#1ca944" />
      </div>
    );
  }

  const allCarsData = data?.data;

  const matchCar = allCarsData.filter((item: Car) => item?.name);

  const handleDeleteProduct = async (id: string) => {
    const carInfo = {
      id: id,
    };
    try {
      const result = await deleteCar(carInfo).unwrap();
      toast.success(result?.message, { duration: 2000 });
    } catch (error: any) {
      toast.error("Something Went Wrong..", { duration: 2000 });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container p-2 mx-auto sm:p-4 text-white">
        <h2 className="mb-8 text-4xl font-semibold leading-tight text-center">
          My Cars To Sell
        </h2>
        <div className="">
          <div className="overflow-x-auto">
            <table className="min-w-full h-full text-xs border-separate border-spacing-4">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead className="mb-4">
                <tr className="text-center border-b-2 border-gray-300">
                  <th className="text-xl">Image</th>
                  <th className="text-xl">Title</th>
                  <th className="text-xl">Category</th>
                  <th className="text-xl">Price</th>
                  <th className="text-xl">Number Of Car</th>
                  <th className="text-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {matchCar.map((item: Car) => (
                  <tr
                    key={item._id}
                    className=" border-b border-opacity-20 border-gray-300"
                  >
                    <td className="text-center">
                      <div className="flex justify-center items-center">
                        <div className="w-14 h-14 overflow-hidden">
                          <img
                            className="w-full h-full object-cover rounded-full"
                            src={item?.image}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <p className="text-lg">{item?.name}</p>
                    </td>
                    <td className="text-center">
                      <p className="text-lg">{item?.category}</p>
                    </td>
                    <td className="text-center">
                      <p className="text-lg">$ {item?.price}</p>
                    </td>
                    <td className="text-center">
                      <p className="text-lg">{item?.stock}</p>
                    </td>
                    <td className="text-center relative">
                      <ul className="py-1 space-y-2">
                        {user && (
                          <li>
                            <button
                              onClick={() => handleDeleteProduct(item?._id)}
                              className="text-center cursor-pointer py-2 bg-gray-50 dark:bg-gray-900 text-white z-10 border border-gray-200 rounded-lg shadow-lg w-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                            >
                              Delete
                            </button>
                          </li>
                        )}
                        <li>
                          <button className="text-center cursor-pointer py-2  bg-gray-50 dark:bg-gray-900 text-white z-10 border border-gray-200 rounded-lg shadow-lg w-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
                            <Link
                              to={`/admin/dashboard/update-product/${item._id}`}
                            >
                              Update
                            </Link>
                          </button>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCar;
