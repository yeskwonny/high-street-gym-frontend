import { createBrowserRouter } from "react-router-dom";
import { RestrictedRoute } from "./components/RestrictedRoute";
import Login from "./pages/Login";
import Timetable from "./pages/Timetable";
import BookingList from "./pages/BookingList";
import Import from "./pages/Import";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import Signup from "./pages/Signup";
import Booking from "./pages/Booking";
import ImportList from "./pages/ImportList";

//check pathname
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/timetable",
    element: (
      <RestrictedRoute allowedRoles={["trainer", "customer"]}>
        <Timetable />
      </RestrictedRoute>
    ),
  },
  {
    path: "/booking/:id",
    element: (
      <RestrictedRoute allowedRoles={["trainer", "customer"]}>
        <Booking />
      </RestrictedRoute>
    ),
  },
  {
    path: "/bookinglist",
    element: (
      <RestrictedRoute allowedRoles={["trainer", "customer"]}>
        <BookingList />
      </RestrictedRoute>
    ),
  },

  {
    path: "/import",
    element: (
      <RestrictedRoute allowedRoles={["trainer"]}>
        <Import />
      </RestrictedRoute>
    ),
  },

  {
    path: "/importlist",
    element: (
      <RestrictedRoute allowedRoles={["trainer"]}>
        <ImportList />
      </RestrictedRoute>
    ),
  },

  {
    path: "/blog",
    element: (
      <RestrictedRoute allowedRoles={["trainer", "customer"]}>
        <Blog />
      </RestrictedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <RestrictedRoute allowedRoles={["trainer", "customer"]}>
        <Profile />
      </RestrictedRoute>
    ),
  },
]);

export default router;
