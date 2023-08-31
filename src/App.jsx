import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout";
import About from "./components/About";
import HostLayout from "./pages/HostData/HostLayout";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";
import VanDetail, { loader as vanDetailLoader } from "./pages/Vans/VanDetail";
import "./App.css";
import Dashboard, {
  loader as dashboardLoader,
} from "./pages/HostData/Dashboard";
import Income from "./pages/HostData/Income";
import Reviews from "./pages/HostData/Reviews";
import HostVanDetails, {
  loader as HostVanDetailsLoader,
} from "./pages/HostData/HostVanDetails";
import HostVans, { loader as hostVansLoader } from "./pages/HostData/HostVans";
import Home from "./components/Home";
import HostVanInfo from "./pages/HostData/HostVanInfo";
import HostVanPricing from "./pages/HostData/HostVanPricing";
import HostVanPhotos from "./pages/HostData/HostVanPhotos";
import NotFound from "./components/NotFound";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import { requireAuth } from "../utils";
import "./server";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route
        path="vans"
        element={<Vans />}
        loader={vansLoader}
        errorElement={<ErrorPage />}
      />
      <Route
        path="vans/:id"
        element={<VanDetail />}
        loader={vanDetailLoader}
        errorElement={<ErrorPage />}
      />

      <Route path="host" element={<HostLayout />}>
        <Route index element={<Dashboard />} loader={dashboardLoader} />
        <Route
          path="income"
          element={<Income />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route path="vans" element={<HostVans />} loader={hostVansLoader} />
        <Route
          path="vans/:id"
          element={<HostVanDetails />}
          loader={HostVanDetailsLoader}
          errorElement={<ErrorPage />}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="pricing"
            element={<HostVanPricing />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="photos"
            element={<HostVanPhotos />}
            loader={async ({ request }) => await requireAuth(request)}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
