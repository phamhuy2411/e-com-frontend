import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn, FiUser, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticateSignInUser } from "../../store/actions";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";

const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

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
        dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-white">
            <form
                onSubmit={handleSubmit(loginHandler)}
                className="sm:w-[400px] w-[95vw] max-w-[400px] relative shadow-2xl py-10 sm:px-10 px-4 rounded-[2rem] border border-orange-500/20 backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_8px_40px_0_rgba(251,146,60,0.15)] hover:border-orange-500/40 group bg-gradient-to-br from-slate-700 via-orange-800 to-slate-600 bg-opacity-95"
            >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 p-4 rounded-full shadow-xl animate-float">
                    <FiLogIn className="text-white text-4xl group-hover:scale-110 transition-transform duration-300"/>
                </div>
                <h1 className="mt-10 text-center font-montserrat text-3xl font-extrabold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
                    Đăng nhập
                </h1>
                <div className="flex flex-col gap-5 mt-8">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 text-xl">
                            <FiUser />
                        </span>
                        <input
                            {...register("username", { required: "*Tên đăng nhập là bắt buộc" })}
                            className="pl-10 pr-4 py-3 w-full rounded-xl border border-orange-500/20 bg-slate-600/50 text-gray-100 placeholder:text-orange-400/70 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-200 shadow-inner font-medium"
                            placeholder="Tên đăng nhập"
                            autoComplete="username"
                        />
                        {errors.username && <span className="text-red-400 text-xs mt-1 block">{errors.username.message}</span>}
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 text-xl">
                            <FiLock />
                        </span>
                        <input
                            {...register("password", { required: "*Mật khẩu là bắt buộc" })}
                            className="pl-10 pr-4 py-3 w-full rounded-xl border border-orange-500/20 bg-slate-600/50 text-gray-100 placeholder:text-orange-400/70 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-200 shadow-inner font-medium"
                            placeholder="Mật khẩu"
                            type="password"
                            autoComplete="current-password"
                        />
                        {errors.password && <span className="text-red-400 text-xs mt-1 block">{errors.password.message}</span>}
                    </div>
                </div>
                <button
                    disabled={loader}
                    className="mt-8 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 flex gap-2 items-center justify-center font-bold text-white w-full py-3 rounded-2xl shadow-lg hover:scale-105 hover:shadow-orange-500/40 transition-all duration-200 text-lg tracking-wide active:scale-95"
                    type="submit"
                >
                    {loader ? (
                        <>
                        <Spinners /> Đang đăng nhập...
                        </>
                    ) : (
                        <>Đăng nhập</>
                    )}
                </button>
                <p className="text-center text-sm text-orange-400 mt-8">
                    Chưa có tài khoản?
                    <Link
                        className="font-semibold underline hover:text-orange-500 ml-1 transition-colors duration-200"
                        to="/register"
                    >
                        Đăng ký ngay
                    </Link>  
                </p>
            </form>
        </div>
    );
}

export default LogIn;