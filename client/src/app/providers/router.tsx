import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import MainPage from "../../page/mainPage/MainPage";
import ErrorPage403 from "../../page/errorPage/errorPage403";
import CardsPage from "../../pages/CardsPage";
import CreateCardPage from "../../pages/CreateCardPage";
import EditCardPage from "../../pages/EditCardPage";
import ViewCardPage from "../../pages/ViewCardPage";
import LoginPage from "../../pages/LoginPage";
import UsersPage from "../../pages/UsersPage";
import ErrorPage404 from "../../page/errorPage/errorPage404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "dashboard",
        element: <MainPage />,
      },
      {
        path: "dashboard/cards",
        children: [
          {
            path: "",
            element: <CardsPage />,
          },
          {
            path: "new",
            element: <CreateCardPage />,
          },
          {
            path: ":cardId",
            element: <ViewCardPage />,
          },
          {
            path: ":cardId/edit",
            element: <EditCardPage />,
          },
        ],
      },
      {
        path: "dashboard/users",
        children: [
          {
            path: "",
            element: <UsersPage />,
          },
          {
            path: "new",
            element: <ErrorPage403 />,
          },
          {
            path: ":userId",
            element: <ErrorPage403 />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage404 />,
  },
]);

export default router;
