import React from "react";
import { useForm } from "react-hook-form";
import FormError from "./FormError";
import useSignUp from "./useSignUp";

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { signUp, isSigningUp } = useSignUp();
  const password = watch("password");

  function onSubmit({ fullName, email, password }) {
    
    signUp(
      { fullName, email, password},
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 p-6 rounded-lg mx-auto"
    >
      {/* Full Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="fullName" className="font-medium">
          Full name
        </label>
        <input
          type="text"
          id="fullName"
          className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-indigo-600 transition"
          {...register("fullName", {
            required: "Full name is required",
            minLength: {
              value: 3,
              message: "Full name must be at least 3 characters",
            },
          })}
        />
        <FormError error={errors.fullName?.message} />
      </div>

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
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
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

      {/* Confirm Password */}
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="font-medium">
          Confirm password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-indigo-600 transition"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
        />
        <FormError error={errors.confirmPassword?.message} />
      </div>

      {/* Submit */}
      <button
        disabled={isSigningUp}
        className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md w-fit mx-auto disabled:opacity-50 transition active:scale-95"
      >
        {isSigningUp ? "Creating account..." : "Sign up"}
      </button>
    </form>
  );
}

export default SignUpForm;