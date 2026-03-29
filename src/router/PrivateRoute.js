import { useCallback, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSession } from "../context/user-context";
import Login from "../pages/Login";
import AccessDenied from "./AccessDenied";

export default function PrivateRoute({ children, roles }) {
  const { isAuthed, user } = useSession();
  const { pathname } = useLocation();

  //   if (!Boolean(user) || !user.hasOwnProperty("id")) {
  //     console.log(user);
  //     console.log("hey im in here");
  //     return <Navigate to="/login" replace />;
  //   }

  if (user === null) return;

  if (!roles.includes(user.role)) {
    return <AccessDenied />;
  }

  if (!isAuthed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
