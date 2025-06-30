import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn, FiUser, FiLock, FiShield, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticateAdminUser } from "../../store/actions/adminActions";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";

const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
    });

    const loginHandler = async (data) => {
        if (loader) return;
        dispatch(authenticateAdminUser(data, toast, reset, () => navigate("/admin"), setLoader));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex justify-center items-center p-4">
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4 shadow-lg">
                        <FiShield className="text-white text-3xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
                    <p className="text-slate-400">Sign in to access the administration dashboard</p>
                </div>

                {/* Login Form */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                    <form onSubmit={handleSubmit(loginHandler)} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    {...register("username", { 
                                        required: "Username is required" 
                                    })}
                                    type="text"
                                    id="username"
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your username"
                                    autoComplete="username"
                                />
                            </div>
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    {...register("password", { 
                                        required: "Password is required" 
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="block w-full pl-10 pr-12 py-3 border border-slate-600 rounded-lg bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                />
                                <span
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer select-none text-orange-400 text-xl"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    tabIndex={0}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </span>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loader}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            {loader ? (
                                <Spinners />
                            ) : (
                                <>
                                    <FiLogIn className="mr-2 h-5 w-5" />
                                    Sign In to Admin Panel
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-400">
                            Need help? Contact your system administrator
                        </p>
                    </div>
                </div>

                {/* Back to main site */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate("/")}
                        className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                    >
                        ← Back to main site
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin; 