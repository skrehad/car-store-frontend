import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterMutation } from "../../redux/features/auth/authApi";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      console.log(data);
      const result = await registerUser(data).unwrap();
      if (result?.success) {
        toast.success("Registration Successfully..", {
          duration: 2000,
        });
        reset();
        navigate("/login");
      }
    } catch (error) {
      console.log("error =>", error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6">
      <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                Full Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter your name..."
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email Address
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
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
            </div>
            <button
              type="submit"
              // className="w-full text-white cursor-pointer bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              className="w-full bg-gradient-to-r  from-blue-500 to-purple-500 text-white py-2 rounded-lg font-medium transition cursor-pointer duration-300"
            >
              Register
            </button>
          </form>
          <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
