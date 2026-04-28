import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiActivity, FiArrowRight, FiShield, FiUsers } from "react-icons/fi";
import Error from "../../../components/ui/Erorr";
import Spinner from "../../../components/ui/Spinner";
import { getUserLogs, getUsers } from "../services/userApi";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [logsData, setLogsData] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchDashboardData() {
      setLoading(true);
      setError(null);

      try {
        const [usersResponse, logsResponse] = await Promise.all([
          getUsers({ page: 1, limit: 8, sort: "-createdAt" }),
          getUserLogs({ page: 1, limit: 6, sort: "-createdAt" }),
        ]);

        if (!mounted) {
          return;
        }

        setUsersData(usersResponse);
        setLogsData(logsResponse);
      } catch (err) {
        if (!mounted) {
          return;
        }

        setError(err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchDashboardData();

    return () => {
      mounted = false;
    };
  }, []);

  const users = usersData?.data || [];
  const logs = logsData?.data || [];

  const adminsInCurrentList = useMemo(() => {
    return users.filter((item) => item.role === "admin").length;
  }, [users]);

  const activeUsersInCurrentList = useMemo(() => {
    return users.filter((item) => item.isActive).length;
  }, [users]);

  if (loading) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-8 max-w-6xl px-4">
        <Error message={error.message} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#1f255f_0%,#1b1f47_35%,#3b1f58_100%)] px-4 py-10 sm:py-16">
      <section className="mx-auto w-full max-w-7xl rounded-3xl border border-white/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.95)_0%,rgba(242,245,255,0.9)_60%,rgba(245,239,255,0.92)_100%)] p-6 shadow-[0_28px_90px_rgba(15,18,56,0.45)] backdrop-blur sm:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex rounded-full bg-[#2e3477] px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#dbe0ff]">
              Control Center
            </p>
            <h1 className="text-4xl font-black tracking-tight text-[#161a3d] sm:text-5xl">
              Dashboard Admin
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-[#4e5380] sm:text-base">
              Manage platform users and monitor activity logs from one global dashboard.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/admin/users"
              className="rounded-2xl bg-[linear-gradient(90deg,#27308b_0%,#13183f_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(22,28,84,0.35)] transition hover:brightness-110"
            >
              Manage Users
            </Link>
            <Link
              to="/admin/logs"
              className="rounded-2xl bg-[linear-gradient(90deg,#b4375d_0%,#7e1f3f_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(137,39,79,0.32)] transition hover:brightness-110"
            >
              Open Logs
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-[#d6dcff] bg-white p-5 shadow-[0_8px_20px_rgba(56,67,139,0.12)]">
            <div className="mb-3 inline-flex rounded-xl bg-[#eff2ff] p-2 text-[#2c3380]">
              <FiUsers className="text-xl" />
            </div>
            <p className="text-sm font-semibold text-[#5a5f85]">Total Users</p>
            <p className="mt-2 text-3xl font-black text-[#181e46]">{usersData?.totalResults || 0}</p>
          </article>

          <article className="rounded-2xl border border-[#d6dcff] bg-white p-5 shadow-[0_8px_20px_rgba(56,67,139,0.12)]">
            <div className="mb-3 inline-flex rounded-xl bg-[#fef0f5] p-2 text-[#a92e59]">
              <FiActivity className="text-xl" />
            </div>
            <p className="text-sm font-semibold text-[#5a5f85]">Total Logs</p>
            <p className="mt-2 text-3xl font-black text-[#181e46]">{logsData?.totalResults || 0}</p>
          </article>

          <article className="rounded-2xl border border-[#d6dcff] bg-white p-5 shadow-[0_8px_20px_rgba(56,67,139,0.12)]">
            <div className="mb-3 inline-flex rounded-xl bg-[#f4f5ff] p-2 text-[#3a3e7d]">
              <FiShield className="text-xl" />
            </div>
            <p className="text-sm font-semibold text-[#5a5f85]">Admins (current list)</p>
            <p className="mt-2 text-3xl font-black text-[#181e46]">{adminsInCurrentList}</p>
          </article>

          <article className="rounded-2xl border border-[#d6dcff] bg-white p-5 shadow-[0_8px_20px_rgba(56,67,139,0.12)]">
            <div className="mb-3 inline-flex rounded-xl bg-[#ecfff7] p-2 text-[#1c845d]">
              <FiArrowRight className="text-xl" />
            </div>
            <p className="text-sm font-semibold text-[#5a5f85]">Active (current list)</p>
            <p className="mt-2 text-3xl font-black text-[#181e46]">{activeUsersInCurrentList}</p>
          </article>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_1fr]">
          <article className="rounded-2xl border border-[#d7dcf2] bg-white p-5 shadow-[0_8px_20px_rgba(56,67,139,0.12)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#1b2257]">Latest User Activity</h2>
              <Link
                to="/admin/logs"
                className="text-sm font-semibold text-[#3741a1] transition hover:text-[#21276c]"
              >
                View all logs
              </Link>
            </div>

            <div className="space-y-3">
              {logs.length > 0 &&
                logs.map((log) => (
                  <div
                    key={log._id}
                    className="rounded-xl border border-[#e8ecff] bg-[#f9faff] p-3"
                  >
                    <p className="text-sm font-bold text-[#27317b]">{log.username} - {log.method || "ACTION"}</p>
                    <p className="mt-1 text-xs text-[#5e648f]">{log.action}</p>
                    <p className="mt-1 text-xs text-[#7a80a8]">{log.url || "-"}</p>
                    <p className="mt-1 text-[11px] text-[#8b91b4]">
                      {log.createdAt ? new Date(log.createdAt).toLocaleString() : "-"}
                    </p>
                  </div>
                ))}

              {logs.length === 0 && (
                <p className="rounded-xl border border-dashed border-[#d1d8f9] bg-[#f7f9ff] p-4 text-sm text-[#676d97]">
                  No activity found.
                </p>
              )}
            </div>
          </article>

          <article className="rounded-2xl border border-[#d7dcf2] bg-white p-5 shadow-[0_8px_20px_rgba(56,67,139,0.12)]">
            <h2 className="mb-4 text-xl font-bold text-[#1b2257]">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/admin/users"
                className="block rounded-xl bg-[linear-gradient(90deg,#2f3792_0%,#1f2350_100%)] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Open Admin Users
              </Link>
              <Link
                to="/admin/logs"
                className="block rounded-xl bg-[linear-gradient(90deg,#9b2f56_0%,#5b1a34_100%)] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Open User Logs
              </Link>
              <Link
                to="/profile"
                className="block rounded-xl border border-[#ced4f1] bg-[#f3f5ff] px-4 py-3 text-sm font-semibold text-[#2b3278] transition hover:bg-[#e9edff]"
              >
                Back to Profile
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
