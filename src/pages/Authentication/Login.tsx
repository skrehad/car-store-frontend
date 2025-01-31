/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { verifyToken } from "../../utils/verifyToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/features/hook";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const result = await login(data).unwrap();
      const user = verifyToken(result.data.token) as TUser;
      dispatch(setUser({ user: user, token: result.data.token }));

      if (result?.success) {
        toast.success("Login Successfully..", {
          duration: 2000,
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Login Failed! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="text-xl mb-5 font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
          CarSellHub
        </h1>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 font-medium text-gray-900 text-md dark:text-white"
                >
                  Your email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="Enter Your Email"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">Email is required</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-5 h-5" />
                    ) : (
                      <FaEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">Password is required</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full  bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-medium transition cursor-pointer duration-300 ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-90"
                }`}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
              <p className="text-sm font-light text-gray-500 text-center dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
