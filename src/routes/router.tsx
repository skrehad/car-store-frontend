import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";
import AddCar from "../pages/admin/AddCar";
import ManageCar from "../pages/admin/ManageCar";
import DeactivateAccounts from "../pages/admin/DeactivateAccounts";
import MangeOrder from "../pages/admin/MangeOrder";
import Contact from "../pages/Contact";
import About from "../pages/About";
import CarDetails from "../pages/CarDetails";
import PaymentSuccessful from "../pages/Payment/PaymentSuccessful";
import PaymentFailed from "../pages/Payment/PaymentFailed";
import AllCars from "../pages/AllCars";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import ViewUserOrderHistory from "../pages/Dashboard/ViewUserOrderHistory";
import UpdateCar from "../pages/admin/UpdateCar";
import ChangePassword from "../pages/Authentication/ChangePassword";
import ProtectedRoute from "../components/layout/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/allCars",
        element: <AllCars></AllCars>,
      },
      {
        path: "/car-details/:id",
        element: <CarDetails></CarDetails>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/change-password",
        element: <ChangePassword></ChangePassword>,
      },

      {
        path: "/payment-successful/:transactionId",
        element: <PaymentSuccessful></PaymentSuccessful>,
      },
      {
        path: "/payment-failed/:transactionId",
        element: <PaymentFailed></PaymentFailed>,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute role="admin">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard></AdminDashboard>,
      },
      {
        path: "add-product",
        element: <AddCar />,
      },
      {
        path: "manage-product",
        element: <ManageCar />,
      },
      {
        path: "managing-orders",
        element: <MangeOrder />,
      },
      {
        path: "deactivating-accounts",
        element: <DeactivateAccounts />,
      },
      {
        path: "update-product/:id",
        element: <UpdateCar></UpdateCar>,
      },
    ],
  },
  {
    path: "/user/dashboard",
    element: (
      <ProtectedRoute role="user">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "view-order-history",
        element: <ViewUserOrderHistory></ViewUserOrderHistory>,
      },
    ],
  },
]);

export default router;
