import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Login from "../../page/login/Login";
import MainPage from "../../page/mainPage/MainPage";
import EditCard from "../../page/clientCard/EditCard";
import UserList from "../../page/users/usersList";
import ErrorPage403 from "../../page/errorPage/errorPage403";
import UserCard from "../../page/users/userCard";
import CreateCard from "../../features/create-card/ui/CreateCard";
import ViewCard from "../../features/view-card/ViewCard";
import ClientList from "../../page/clientList/clientList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
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
            element: <ClientList/>,
          },
          {
            path: "new",
            element: <CreateCard />,
          },
          {
            path: ":cardId",
            element: <ViewCard />,
          },
          {
            path: ":cardId/edit",
            element: <EditCard />,
          },
        ],
      },
      {
        path: "dashboard/users",
        children: [
          {
            path: "",
            element: <UserList />,
          },
          {
            path: "new",
            element: <ErrorPage403 />,
          },
          {
            path: ":userId",
            element: <UserCard />,
          },
        ],
      },
    ],
  },
]);

export default router;
