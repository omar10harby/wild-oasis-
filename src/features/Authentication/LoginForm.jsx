import React from "react";
import { useForm } from "react-hook-form";
import useLogin from "./useLogin";
import FormError from "./FormError"; // كومبوننت لعرض الأخطاء

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login, isLogin } = useLogin();

  function onSubmit({ email, password }) {
    login({ email, password });
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5  p-6 rounded-lg   mx-auto"
    >
      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-medium">
          Email address
        </label>
        <input
          type="text"
          id="email"
          className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-indigo-600 transition"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
            },
          })}
        />
        <FormError error={errors.email?.message} />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <label htmlFor="pass" className="font-medium">
          Password
        </label>
        <input
          type="password"
          id="pass"
          className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-indigo-600 transition"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        <FormError error={errors.password?.message} />
      </div>

      {/* Submit */}
      <button
        disabled={isLogin}
        className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md w-fit mx-auto disabled:opacity-50 transition active:scale-95"
      >
        {isLogin ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}

export default LoginForm;
