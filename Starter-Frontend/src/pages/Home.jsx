import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#353d9a_0%,#2b307b_48%,#8453ad_100%)] px-4 py-10 sm:py-16">
      <section className="mx-auto w-full max-w-5xl rounded-3xl bg-[#f7f7fb] p-6 shadow-[0_24px_70px_rgba(19,23,79,0.38)] sm:p-10">
        <div className="mb-8 rounded-full bg-[#dbdbe3] p-1.5 sm:w-fit">
          <div className="rounded-full bg-[linear-gradient(90deg,#ff6a8d_0%,#ff2f74_100%)] px-8 py-3 text-center text-base font-bold text-white shadow-[0_8px_24px_rgba(255,68,135,0.45)]">
            Starter Kit
          </div>
        </div>

        <h1 className="mb-4 text-4xl font-extrabold tracking-wide text-[#171b3d] sm:text-5xl">
          Welcome Home
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-[#555a80] sm:text-xl">
          Build modern applications with a polished UI foundation, reusable patterns, and a scalable project structure.
        </p>

        <div className="mb-10 flex flex-wrap gap-3">
          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                className="rounded-2xl bg-[linear-gradient(90deg,#3d3fa5_0%,#1d2146_100%)] px-8 py-3 text-base font-semibold text-white shadow-[0_12px_24px_rgba(31,35,82,0.35)] transition hover:brightness-110"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-2xl border border-[#cfd4ea] px-8 py-3 text-base font-semibold text-[#2a2f68] transition hover:bg-[#ecefff]"
              >
                Create Account
              </Link>
            </>
          )}

          {isAuthenticated && (
            <Link
              to="/profile"
              className="rounded-2xl bg-[linear-gradient(90deg,#3d3fa5_0%,#1d2146_100%)] px-8 py-3 text-base font-semibold text-white shadow-[0_12px_24px_rgba(31,35,82,0.35)] transition hover:brightness-110"
            >
              Go to Profile
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            { title: "Fast", desc: "Smooth, responsive pages with modern tooling and optimized DX." },
            { title: "Secure", desc: "Built-in auth flows and API structure ready for production patterns." },
            { title: "Scalable", desc: "Feature-based architecture that grows cleanly with your app." },
          ].map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-[#d9def0] bg-white p-6 shadow-[0_8px_16px_rgba(58,69,131,0.12)] transition hover:-translate-y-1 hover:shadow-[0_16px_28px_rgba(58,69,131,0.18)]"
            >
              <h2 className="mb-2 text-2xl font-bold text-[#2c3380]">{feature.title}</h2>
              <p className="text-[#5d6288]">{feature.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}