/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import {
  useCancelOrderMutation,
  useDeleteOrderMutation,
  useGetUserOrdersDataQuery,
} from "../../redux/features/OrderManagement/orderApi";
import { RingLoader } from "react-spinners";
import { useAppSelector } from "../../redux/features/hook";
import { TOrder, User } from "../../constants/type";
import { toast } from "sonner";

const ViewUserOrderHistory: React.FC = () => {
  const user = useAppSelector(useCurrentUser) as User;

  const [cancelOrder] = useCancelOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const { data, isLoading } = useGetUserOrdersDataQuery(user?.email, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const userData = data?.data?.filter(
    (item: any) => item.userInfo?.email === user.email
  );

  console.log(userData);

  // console.log(selectedAuthor, setSelectedAuthor);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <RingLoader size={80} color="#1ca944" />
      </div>
    );
  }

  // const userOrderData = data?.data;

  const handleDeleteOrder = async (id: string) => {
    // console.log(id);
    const orderInfo = {
      id: id,
    };

    // console.log(orderInfo);

    try {
      const result = await deleteOrder(orderInfo).unwrap();
      // console.log(result);
      toast.success(result.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  const handleCancelOrder = async (id: string) => {
    // console.log(id);
    const orderInfo = {
      id: id,
    };

    // console.log(orderInfo);

    try {
      const result = await cancelOrder(orderInfo).unwrap();
      // console.log(result);
      toast.success(result.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white p-6 min-h-screen">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          {/* Table Head */}
          <thead>
            <tr>
              <th className="px-6 py-3 text-center">Image</th>
              <th className="px-6 py-3 text-center">Title</th>
              <th className="px-6 py-3 text-center">Price</th>
              <th className="px-6 py-3 text-center">Category</th>
              <th className="px-6 py-3 text-center">Transaction ID</th>
              <th className="px-6 py-3 text-center">Paid Status</th>
              <th className="px-6 py-3 text-center">Action</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {/* Table Rows */}
            {userData?.map((item: TOrder) => (
              <tr key={item._id} className="border-b border-gray-700">
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center">
                    <div className="rounded-full h-12 w-12 overflow-hidden">
                      <img
                        src={item?.product?.image}
                        alt="Avatar"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">{item?.product?.name}</td>
                <td className="px-6 py-4 text-center">
                  ৳ {item?.product?.price}
                </td>
                <td className="px-6 py-4 text-center">
                  {item?.product?.category}
                </td>
                <td className="px-6 py-4 text-center">
                  {item?.transactionId.slice(0, 10)}...
                </td>
                <td className="px-6 py-4 text-center">
                  {item?.paidStatus.toString()}
                </td>
                <td className="py-4 text-center">
                  <button
                    onClick={() => handleCancelOrder(item?._id)}
                    className="text-white cursor-pointer mr-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 focus:outline-none text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                  >
                    Cancel Order
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(item?._id)}
                    className="text-white cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 focus:outline-none text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                  >
                    Delete Order
                  </button>
                </td>
                {/* <td className="py-4 text-center">
                  <button
                    onClick={() => handleDeleteOrder(item?._id)}
                    className="text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 focus:outline-none text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                  >
                    Delete Order
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUserOrderHistory;
