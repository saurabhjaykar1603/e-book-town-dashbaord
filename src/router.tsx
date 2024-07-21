import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import BooksPage from "./pages/Books";
import AuthLayout from "./layouts/AuthLayout";
import App from "./App";
import CreateBook from "./pages/CreateBook";
import UpdateBook from "./pages/UpdateBook";

const router = createBrowserRouter([
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "books",
        element: <BooksPage />,
      },
      {
        path: "books/create",
        element: <CreateBook />,
      },
      {
				path: 'books/update/:id',
				element: <UpdateBook />,
			},
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
  },
]);
export default router;
