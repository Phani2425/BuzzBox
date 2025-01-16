import { useSelector } from "react-redux";
import { RootState } from "../../main";
import { Navigate } from "react-router-dom";

interface props {
  children: React.ReactNode;
  redirect: string;
  role: string;
}

const RouteProtector: React.FC<props> = ({ children, redirect, role }) => {
  const { user, admin } = useSelector((state: RootState) => state.auth);

  if (role === "user" && !user) return <Navigate to={redirect} />;

  if (role === "admin" && !admin) return <Navigate to={redirect} />;

  return children;
};

export default RouteProtector;
