import { useState } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "sonner";
import { useAppSelector } from "../../redux/features/hook";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import {
  useAcceptOrderMutation,
  useCancelOrderMutation,
  useDeleteOrderMutation,
  useGetAdminOrdersDataQuery,
} from "../../redux/features/OrderManagement/orderApi";
import { TOrder, User } from "../../constants/type";

const ManageOrder = () => {
  const user = useAppSelector(useCurrentUser) as User;

  const { data, isLoading } = useGetAdminOrdersDataQuery(user?.email, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 2000,
  });

  console.log(data);
  const [acceptOrder] = useAcceptOrderMutation();
  const [cancelOrder] = useCancelOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  // Modal state
  const [selectedBuyer, setSelectedBuyer] = useState<TOrder | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <RingLoader size={80} color="#1ca944" />
      </div>
    );
  }

  const orderData = data?.data;
  // console.log(orderData);

  const handleAcceptOrder = async (id: string) => {
    const bookInfo = {
      id: id,
    };

    try {
      const result = await acceptOrder(bookInfo).unwrap();
      console.log(result);
      toast.success(result.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  const handleCancelOrder = async (id: string) => {
    const bookInfo = {
      id: id,
    };

    try {
      const result = await cancelOrder(bookInfo).unwrap();
      // console.log(result);
      toast.success(result.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
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

  return (
    <div className="bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white p-6 min-h-screen">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto ">
          {/* Table Head */}
          <thead>
            <tr>
              <th className=" text-lg py-3 text-center">Image</th>
              <th className=" text-lg py-3 text-center">Name</th>
              <th className=" text-lg py-3 text-center">Price</th>
              <th className=" text-lg py-3 text-center">Category</th>
              <th className=" text-lg py-3 text-center">Tran. ID</th>
              <th className=" text-lg py-3 text-center">Status</th>
              <th className=" text-lg py-3 text-center">Action</th>
              <th className=" text-lg py-3 text-center">Buyer Details</th>
            </tr>
          </thead>
          <tbody>
            {/* Table Rows */}
            {orderData?.map((item: TOrder) => (
              <tr key={item._id} className="border-b">
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <div className="rounded-full h-12 w-12 overflow-hidden">
                      <img
                        src={item?.product?.image}
                        alt="Avatar"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 font-bold text-center py-4">
                  {item?.product?.name}
                </td>
                <td className="px-6 font-bold text-center py-4">
                  $ {item?.product?.price}
                </td>
                <td className="px-6 font-bold text-center py-4">
                  {item?.product?.category}
                </td>
                <td className="px-6 font-bold text-center py-4">
                  {item?.transactionId.slice(0, 10)}...
                </td>
                <td className="px-6 text-center font-bold py-4">
                  {item?.paidStatus.toString()}
                </td>

                <td className="px-6 text-center font-bold py-4 ">
                  <button
                    onClick={() => handleAcceptOrder(item?._id)}
                    className="text-white m-1  bg-gradient-to-r cursor-pointer from-purple-500 to-blue-500  hover:from-blue-500 hover:to-purple-500 focus:outline-none  text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleCancelOrder(item?._id)}
                    className="text-white  m-1 bg-gradient-to-r cursor-pointer from-purple-500 to-blue-500  hover:from-blue-500 hover:to-purple-500 focus:outline-none  text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => handleDeleteOrder(item?._id)}
                    className="text-white  m-1 bg-gradient-to-r cursor-pointer from-purple-500 to-blue-500  hover:from-blue-500 hover:to-purple-500 focus:outline-none  text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                  >
                    Delete
                  </button>
                </td>
                <td className="px-6 text-center py-4 ">
                  <button
                    className="text-white bg-gradient-to-r cursor-pointer from-purple-500 to-blue-500  hover:from-blue-500 hover:to-purple-500 focus:outline-none  text-xs py-1 px-3 rounded-full hover:bg-blue-600"
                    onClick={() => setSelectedBuyer(item)}
                  >
                    Buyer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedBuyer && (
        <div className="fixed inset-0 flex items-center justify-center  z-50">
          <div className="bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white rounded-lg w-96 p-6 relative">
            <h3 className="font-bold text-lg mb-4">Buyer Details</h3>
            <p className="py-2">
              <strong>Name:</strong> {selectedBuyer?.userInfo.name}
            </p>
            <p className="py-2">
              <strong>Email:</strong> {selectedBuyer?.userInfo.email}
            </p>
            <p className="py-2">
              <strong>Transaction ID:</strong> {selectedBuyer?.transactionId}
            </p>

            <div className="absolute top-3 right-3">
              <button
                className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600"
                onClick={() => setSelectedBuyer(null)} // মোডাল বন্ধ
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrder;
