import DefaultLayout from "@/layouts/DefaultLayout";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFoundView from "@/modules/not-found/NotFoundView";
//import AuthLayout from "@/layouts/AuthLayout";
import { store } from "@/store";
import { Provider } from "react-redux";
import { Toaster } from "./ui/toaster";
import Loader from "./Loader";
import CartView from "@/modules/cart/CartView";
import CashierView from "@/modules/cashier/CashierView";
import HomeView from "@/modules/home/HomeView";
import ProductView from "@/modules/product/ProductView";
import ManagerView from "@/modules/manager/ManagerView";
import LoginView from "@/modules/auth/login/LoginView";
import UserListView from "@/modules/manager/UserListView";
import AuthLayout from "@/layouts/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <HomeView />,
      },
      {
        path: "product",
        element: <ProductView />,
      },
      {
        path: "cart",
        element: <CartView />,
      },
      {
        path: "cashier",
        element: <CashierView />,
      },
      {
        path: "manager-management",
        element: <ManagerView />,
      },
      {
        path: "user",
        element: <UserListView />,
      }
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        element: <LoginView />,
      }
    ],
  },
  {
    path: "*",
    element: <NotFoundView />,
  },
]);

const Wrapper = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Loader />
          <Toaster />
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
};

export default Wrapper;