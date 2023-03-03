import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AuthGuard = (props) => {
  const user = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user.auth) {
    return <Navigate to="/login" />;
  }

  return props.children;
};

export default AuthGuard;
