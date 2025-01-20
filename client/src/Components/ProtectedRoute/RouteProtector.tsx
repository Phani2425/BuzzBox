import { useSelector } from "react-redux";
import { RootState } from "../../main";
import { Navigate } from "react-router-dom";

interface props {
  children: React.ReactNode;
  redirect: string;
  role: string;
}

const RouteProtector: React.FC<props> = ({ children, redirect, role }) => {
  const { user, admin,userNameSet } = useSelector((state: RootState) => state.auth);

  console.log(user, admin,userNameSet);

  if (role === "user" && !user) return <Navigate to={redirect} />;

  if (role === "admin" && !admin) return <Navigate to={redirect} />;

  if(role === 'user' && !userNameSet) return <Navigate to={'/username'} />

  return children;
};

export default RouteProtector;
