/* eslint-disable @typescript-eslint/no-explicit-any */
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/features/hook";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { TResponse } from "../../types/global";
import { logout } from "../../redux/features/auth/authSlice";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangePassword: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const res = (await changePassword(data)) as TResponse<any>;
    console.log(res?.data?.success);
    if (res?.data?.success) {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-5 mt-20 rounded shadow">
      <h2 className="text-xl font-bold text-center mb-4">Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          placeholder="Old Password"
          className="border w-full p-2 mb-2"
        />
        <input
          type="password"
          placeholder="New Password"
          className="border w-full p-2 mb-2"
        />
        <div className="text-center my-3">
          <button
            type="submit"
            className="bg-blue-500  cursor-pointer text-white px-4 py-2 rounded"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
