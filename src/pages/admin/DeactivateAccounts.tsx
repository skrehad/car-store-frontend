import { RingLoader } from "react-spinners";

import { toast } from "sonner";
import {
  useActiveAccountMutation,
  useChangeRoleMutation,
  useDeactivateAccountMutation,
  useGetAllUserDataQuery,
} from "../../redux/features/auth/authApi";

type TUser = {
  createdAt: string; // ISO date string
  email: string;
  isBlocked: boolean;
  name: string;
  role: string;
  updatedAt: string; // ISO date string
  __v: number;
  _id: string; // ObjectId as a string
};
const DeactivateAccounts = () => {
  const { data, isLoading } = useGetAllUserDataQuery(undefined);
  const [deactivateAccount] = useDeactivateAccountMutation();
  const [activeAccount] = useActiveAccountMutation();
  const [changeRole] = useChangeRoleMutation();
  console.log(data?.data);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <RingLoader size={80} color="#1ca944" />
      </div>
    );
  }

  const usersData = data?.data;
  // console.log(usersData);

  const handleDeActive = async (id: string) => {
    try {
      // console.log(id);

      const userInfo = {
        id: id,
      };

      // console.log(userInfo);

      const result = await deactivateAccount(userInfo).unwrap(); // unwrap to get the actual response data
      // console.log(result);
      // handle the success response

      toast.success(result.message, { duration: 2000 });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // console.error("Error deactivating account:", err);
    }
  };

  const handleActive = async (id: string) => {
    try {
      // console.log(id);

      const userInfo = {
        id: id,
      };

      // console.log(userInfo);

      const result = await activeAccount(userInfo).unwrap(); // unwrap to get the actual response data
      // console.log(result);
      // handle the success response

      toast.success(result.message, { duration: 2000 });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // console.error("Error deactivating account:", err);
    }
  };

  const handleRoleChange = async (
    selectedRole: string,
    selectedUserEmail: string
  ) => {
    // console.log("Selected Role:", selectedRole);

    try {
      const userRole = {
        role: selectedRole,
        email: selectedUserEmail,
      };
      const result = await changeRole(userRole).unwrap();
      toast.success(result.message, { duration: 2000 });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white p-6 min-h-screen">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          {/* head */}
          <thead>
            <tr>
              <th className="px-6 py-3 text-center text-xl">Name</th>
              <th className="px-6 py-3 text-center text-xl">Email</th>
              <th className="px-6 py-3 text-center text-xl">Role</th>
              <th className="px-6 py-3 text-center text-xl">Change Role</th>
              <th className="px-6 py-3 text-center text-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {usersData?.map((item: TUser, idx: number) => (
              <tr key={idx} className="border-b">
                <td className="px-6 text-center py-4">
                  <div className="flex justify-center items-center">
                    <div>
                      <div className="  text-lg">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 text-center py-4">
                  <div className=" text-lg">{item.email}</div>
                </td>
                <td className="px-6 text-center py-4">
                  <div className="text-lg">{item.role}</div>
                </td>
                <td className="px-6 text-center py-4">
                  <select
                    onChange={(e) =>
                      handleRoleChange(e.target.value, item.email)
                    }
                    defaultValue={""}
                    className="border rounded-lg px-2 py-1 focus:outline-none"
                  >
                    <option value="" disabled className="bg-[#1C1C32] ">
                      Select Role
                    </option>

                    <option
                      value={"user"}
                      disabled={item.role === "user"}
                      className=" bg-[#1C1C32]"
                    >
                      User
                    </option>
                    <option
                      value={"admin"}
                      disabled={item.role === "admin"}
                      className="bg-[#1C1C32]"
                    >
                      Admin
                    </option>
                  </select>
                </td>
                <td className="px-6 text-center py-4">
                  {" "}
                  {item?.isBlocked === false && (
                    <button
                      onClick={() => {
                        handleDeActive(item._id);
                      }}
                      className="text-white cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none px-2 py-1 w-[100px]"
                    >
                      Deactivate
                    </button>
                  )}
                  {item?.isBlocked === true && (
                    <button
                      onClick={() => {
                        handleActive(item._id);
                      }}
                      className="text-white cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none px-2 py-1 w-[100px]"
                    >
                      Make Active
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default DeactivateAccounts;
