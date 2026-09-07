import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile, updateProfile, analyzeUser } from "../services/userApi.js";
import Spinner from "../../../components/ui/Spinner.jsx";
import Error from "../../../components/ui/Erorr.jsx";
import { useToast } from "../../../context/ToastContext";
import { isEmail, isNotEmpty } from "../../../utils/validation";
import { useAuth } from "../../auth/hooks/useAuth.js";
import { useForm } from "react-hook-form";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm();

  // fetch profile
  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const data = user || (await getProfile());
        const analysis = await analyzeUser();
        setAnalysis(analysis.data);
        reset({
          username: data?.username || "",
          email: data?.email || "",
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user, reset]);



  async function onSubmit(data) {
    try {
      const updatedData = await updateProfile(data);
      setUser(updatedData);
      // reset(updatedData);
      toast.success("Profile updated successfully ✅");
    } catch (error) {
      toast.error(error.message || "Failed to update profile ❌");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#353d9a_0%,#2b307b_48%,#8453ad_100%)] px-4 py-10 sm:py-16">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center rounded-3xl bg-[#f7f7fb] p-8 text-center shadow-[0_24px_70px_rgba(19,23,79,0.38)] sm:p-10">
          <div className="mb-4 rounded-full bg-[#ecefff] px-4 py-1 text-sm font-bold tracking-wide text-[#5057a1]">
            Profile
          </div>
          <Spinner size="lg" />
          <p className="mt-4 text-lg font-semibold text-[#2b3278]">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }
  if (error) return <Error message={error.message} />;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#353d9a_0%,#2b307b_48%,#8453ad_100%)] px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-xl rounded-3xl bg-[#f7f7fb] p-6 shadow-[0_24px_70px_rgba(19,23,79,0.38)] sm:p-10">
        <div className="mb-8 rounded-full bg-[#dbdbe3] p-1.5">
          <div className="rounded-full bg-[linear-gradient(90deg,#ff6a8d_0%,#ff2f74_100%)] px-4 py-3 text-center text-base font-bold text-white shadow-[0_8px_24px_rgba(255,68,135,0.45)]">
            Profile Settings
          </div>
        </div>
        {analysis && (
          <div className="mb-8 rounded-2xl border border-[#d9def0] bg-[linear-gradient(135deg,#eef1ff_0%,#f8efff_100%)] p-4 shadow-[0_8px_20px_rgba(58,69,131,0.08)]">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                ✨
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#5057a1]">
                  AI Analysis
                </p>
                <p className="mt-1 text-sm leading-6 text-[#5a5f85]">
                  {analysis}
                </p>
              </div>
            </div>
          </div>
        )}

        <h1 className="mb-3 text-center text-4xl font-extrabold tracking-wide text-[#171b3d]">
          My Profile
        </h1>
        <p className="mb-8 text-center text-sm text-[#5a5f85] sm:text-base">
          Update your account details using the same UI style as the auth screens.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            {...register("username", {
              required: "Username is required",
              validate: (value) => isNotEmpty(value) || "Invalid username",
            })}
            className={`w-full rounded-2xl border px-5 py-3 text-base outline-none transition ${
              errors.username
                ? "border-red-500 bg-red-50"
                : "border-[#d9def0] bg-[#edf2fc] focus:border-[#6f7eea]"
            }`}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              validate: (value) => isEmail(value) || "Invalid email",
            })}
            className={`w-full rounded-2xl border px-5 py-3 text-base outline-none transition ${
              errors.email
                ? "border-red-500 bg-red-50"
                : "border-[#d9def0] bg-[#edf2fc] focus:border-[#6f7eea]"
            }`}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

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
              {isSubmitting ? "Saving changes..." : "Save Changes"}
            </button>
          </div>
        </form>

        <section className="mt-8 rounded-2xl border border-[#d9def0] bg-white p-5 shadow-[0_8px_16px_rgba(58,69,131,0.08)]">
          <h2 className="text-xl font-bold text-[#2c3380]">Security</h2>
          <p className="mt-2 text-sm text-[#5d6288]">
            If you think your password is weak or exposed, update it now.
          </p>

          <Link
            to="/reset-password"
            className="mt-4 inline-flex rounded-2xl bg-[linear-gradient(90deg,#3d3fa5_0%,#1d2146_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(31,35,82,0.35)] transition hover:brightness-110"
          >
            Reset Password
          </Link>
        </section>
      </div>
    </div>
  );
}