import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Truck,
  Mail,
  Eye,
  EyeOff,
  User,
  UserPlus,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../API/useAxiosPublic";
import toast from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";

function Register() {
  const api = useAxiosPublic();
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await api.post("/auth/register", data);
      console.log(res);
      if (res.data.success === true) {
        setIsLoading(false);
        toast.success("Registration Successful!");
        setUser(res.data.data.user);
        setTimeout(() => {
          navigate(`/dashboard`);
        }, 3000);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="min-h-screen flex">
        {/* Left Side - Welcome Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 items-center justify-center p-12">
          <div className="text-center text-white">
            <div className="mx-auto h-24 w-24 lg:border-4 lg:border-white bg-opacity-20 rounded-full flex items-center justify-center mb-8">
              <Truck className="h-12 w-12 text-white" />
            </div>
            <div className="mb-4">
              <h1 className="text-5xl font-bold mb-2">CPMS</h1>
              <p className="text-lg text-orange-100">
                Courier & Parcel Management System
              </p>
            </div>
            <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
            <p className="text-xl text-orange-100 mb-8">
              Create your courier management account
            </p>
            <div className="space-y-4 text-orange-100">
              <div className="flex items-center justify-center space-x-3">
                <UserPlus className="h-6 w-6" />
                <span>Easy Registration Process</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <User className="h-6 w-6" />
                <span>Customer & Agent Accounts</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Truck className="h-6 w-6" />
                <span>Start Managing Deliveries</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Header - Only visible on small screens */}
            <div className="text-center mb-8 lg:hidden">
              <div className="mx-auto h-16 w-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-orange-600 mb-1">CPMS</h1>
              <p className="text-sm text-gray-500 mb-2">
                Courier & Parcel Management System
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">
                Sign up for your courier management account
              </p>
            </div>

            {/* Registration Form */}
            <div className="bg-white py-8 px-6 shadow-xl rounded-lg sm:px-8">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      {...register("name", {
                        required: "Full name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      className={`appearance-none relative block w-full px-3 py-3 border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm transition-colors`}
                      placeholder="Enter your full name"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={`appearance-none relative block w-full px-3 py-3 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm transition-colors`}
                      placeholder="Enter your email"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className={`appearance-none relative block w-full px-3 py-3 border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm transition-colors pr-10`}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      className="absolute z-10 inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Role Field */}
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Account Type
                  </label>
                  <div className="relative">
                    <select
                      id="role"
                      {...register("role", {
                        required: "Please select an account type",
                      })}
                      className={`appearance-none relative block w-full px-3 py-3 border ${
                        errors.role ? "border-red-500" : "border-gray-300"
                      } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm transition-colors pr-10 bg-white`}
                    >
                      <option value="">Select account type</option>
                      <option value="customer">Customer</option>
                      <option value="agent">Agent</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>

                {/* Divider */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Already have an account?
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sign In Link */}
                <div className="text-center">
                  <Link
                    to={"/"}
                    className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
                  >
                    Sign in to your account
                  </Link>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 mt-8">
              <p>&copy; 2025 Courier Management System. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
