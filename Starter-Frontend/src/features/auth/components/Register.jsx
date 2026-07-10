import { Link } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";
import {hasMinLength,  isEmail,  isEqualsToOtherValue,  isNotEmpty} from "../../../utils/validation";
import { register  } from "../services/authApi";
import { useCheckbox } from "../../../hooks/useCheckBox.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useForm } from "react-hook-form";

export default function Register() {
  const toast = useToast();
  const navigate = useNavigate();
  const { Register  } = useAuth();
  

  const {register, handleSubmit, getValues, formState: { errors , isDirty , isSubmitting }, reset} = useForm({defaultValues: {username: "", email: "", password: "", confirmPassword: "", termsAccepted: false}});
  
  async function onsubmit(data) {
    try {
      delete data.confirmPassword; // Remove confirmPassword before sending to API
      delete data.termsAccepted; // Remove termsAccepted before sending to API
      await Register(data);
      toast.success("Registration successful ✅");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.message || "Registration failed ❌");
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#353d9a_0%,#2b307b_48%,#8453ad_100%)] px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-xl rounded-3xl bg-[#f7f7fb] p-6 shadow-[0_24px_70px_rgba(19,23,79,0.38)] sm:p-10">
        <div className="mb-8 grid grid-cols-2 gap-2 rounded-full bg-[#dbdbe3] p-1.5">
          <Link
            to="/login"
            className="rounded-full px-4 py-3 text-center text-base font-bold text-white/80 transition hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-[linear-gradient(90deg,#ff6a8d_0%,#ff2f74_100%)] px-4 py-3 text-center text-base font-bold text-white shadow-[0_8px_24px_rgba(255,68,135,0.45)]"
            aria-current="page"
          >
            Register
          </Link>
        </div>

        <h2 className="mb-8 text-center text-4xl font-extrabold tracking-wide text-[#171b3d]">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
            <input
              {...register("username",
                 { required: "Username is required",
                   minLength: { value: 3, message: "Username must be at least 3 characters long" }
                   })}
              placeholder="Choose a username"
              className={`w-full rounded-2xl border px-5 py-3 text-base outline-none transition ${
                errors.username
                  ? "border-red-500 bg-red-50"
                  : "border-[#d9def0] bg-[#edf2fc] focus:border-[#6f7eea]"
              }`}
            />
          {errors.username && (
            <p className="mt-2 text-sm font-medium text-red-500">{errors.username.message}</p>
          )}


            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email address"
                }
              })
              }
              placeholder="name@example.com"
              className={`w-full rounded-2xl border px-5 py-3 text-base outline-none transition ${
                errors.email
                  ? "border-red-500 bg-red-50"
                  : "border-[#d9def0] bg-[#edf2fc] focus:border-[#6f7eea]"
              }`}
            />
            {errors.email && (
              <p className="mt-2 text-sm font-medium text-red-500">{errors.email.message}</p>
            )}
         

           <label htmlFor="password" className="block text-sm font-medium text-gray-700"> Password </label> 
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long"
                }
              })}
              type="password"
              placeholder="At least 6 characters"
              className={`w-full rounded-2xl border px-5 py-3 text-base outline-none transition ${
                errors.password
                  ? "border-red-500 bg-red-50"
                  : "border-[#d5d9eb] bg-white shadow-[0_8px_16px_rgba(58,69,131,0.12)] focus:border-[#6f7eea]"
              }`}
            />
            {errors.password && (
              <p className="mt-2 text-sm font-medium text-red-500">{errors.password.message}</p>
            )}


            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700"> Confirm Password </label> 
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                 validate: (value) => value === getValues("password") || "Passwords do not match",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long"
                }
              })}
              type="password"
              placeholder="Retype your password"
              className={`w-full rounded-2xl border px-5 py-3 text-base outline-none transition ${
                errors.confirmPassword
                  ? "border-red-500 bg-red-50"
                  : "border-[#d5d9eb] bg-white shadow-[0_8px_16px_rgba(58,69,131,0.12)] focus:border-[#6f7eea]"
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-sm font-medium text-red-500">{errors.confirmPassword.message}</p>
            )}
          

          <div className="pt-1">
            <label className="flex items-center gap-3 text-sm text-[#4f5376]">
              <input
                {...register("termsAccepted", {
                  required: "You must accept the terms and conditions"
                })}
                type="checkbox"
                className="h-4 w-4 rounded border-[#b7bfd8] text-[#393e98] focus:ring-[#626ee0]"
              />
              I agree to the terms and conditions
            </label>
            {errors.termsAccepted && (
              <p className="mt-2 text-sm font-medium text-red-500">You must accept the terms.</p>
            )}
          </div>

            <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => reset()}
              disabled={!isDirty || isSubmitting}
              className="rounded-2xl border border-[#cfd4ea] px-5 py-3 text-base font-semibold text-[#2a2f68] transition hover:bg-[#ecefff] disabled:opacity-50"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={!isDirty || isSubmitting}
              className="rounded-2xl bg-[linear-gradient(90deg,#3d3fa5_0%,#1d2146_100%)] px-5 py-3 text-base font-semibold text-white shadow-[0_12px_24px_rgba(31,35,82,0.35)] transition hover:brightness-110 disabled:opacity-50"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}