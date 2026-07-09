import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Spinner from "../components/ui/Spinner";
export default function RootRoute() {
  return (
    <>
      <Header />

      <Suspense fallback={<Spinner size="lg" className="text-blue-500" />}>
        <Outlet />
      </Suspense>

      <Footer />
    </>
  );
}