/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { RingLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../redux/features/hook";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { TOrder, User } from "../../constants/type";
import { useGetUserOrdersDataQuery } from "../../redux/features/OrderManagement/orderApi";

const UserDashboard = () => {
  const user = useAppSelector(useCurrentUser) as User;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully");
    navigate("/");
  };

  console.log(user?.email);

  const { data, isLoading } = useGetUserOrdersDataQuery(user?.email, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    // pollingInterval: 30000,
  });

  const userData = data?.data?.filter(
    (item: any) => item.userInfo?.email === user.email
  );

  console.log("Filtered Data:", userData);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <RingLoader size={80} color="#1ca944" />
      </div>
    );
  }

  // const orderData = data?.data;

  const priceData = userData?.map((item: TOrder) =>
    Number(item?.product?.price)
  );
  // console.log(priceData);
  const totalPrice =
    priceData?.reduce((sum: number, price: number) => sum + price, 0) || 0;
  //   console.log(totalPrice);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white ">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.aside
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1 bg-[#2B1E36] p-6 rounded-lg shadow-lg min-h-screen"
          >
            <div className="text-center">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="https://via.placeholder.com/100"
                alt="User"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-purple-400"
              />
              <h2 className="text-xl font-bold mb-2">{user?.name}</h2>
              <p className="text-sm text-gray-400">{user?.email}</p>
              <p className="text-sm text-gray-400">Role : {user?.role}</p>
            </div>

            <div className="my-10 flex flex-col items-center justify-center gap-5">
              <Link
                to="/"
                className="w-[150px] text-center px-12 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none"
              >
                <span className="text-white">Home</span>
              </Link>
              <button
                onClick={() => handleLogout()}
                className="w-[150px] text-center cursor-pointer px-12 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none"
              >
                <span className="text-white">Logout</span>
              </button>

              <Link
                to="/"
                className="w-[150px] text-center px-12 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none"
              >
                <span className="text-white">Change Password</span>
              </Link>
            </div>
          </motion.aside>
          <motion.main
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-3 bg-[#2B1E36] p-6 rounded-lg shadow-lg min-h-screen"
          >
            <h1 className="text-2xl font-bold mb-6">Order Summary</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#3A2E42] p-4 rounded-lg"
              >
                <h3 className="text-gray-400">Total Spend</h3>
                <p className="text-2xl font-bold">৳ {totalPrice}</p>
                <div className="h-1 bg-purple-500 mt-2 rounded-full w-3/4" />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#3A2E42] p-4 rounded-lg"
              >
                <h3 className="text-gray-400">Active Orders</h3>
                <p className="text-2xl font-bold">{userData?.length}</p>
                <div className="h-1 bg-green-500 mt-2 rounded-full w-1/2" />
              </motion.div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#3A2E42]">
                  <tr>
                    <th className="p-3 text-center">Transaction ID</th>
                    <th className="p-3 text-center">Car Name</th>
                    <th className="p-3 text-center">Price</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((item: TOrder) => (
                    <tr key={item._id}>
                      <td className="p-3 text-center">{item?._id}</td>
                      <td className="p-3 text-center">{item?.product?.name}</td>
                      <td className="p-3 text-center">
                        ৳ {item?.product?.price}
                      </td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-1 rounded-full text-center bg-green-500/20 text-green-400">
                          {item?.OrderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
