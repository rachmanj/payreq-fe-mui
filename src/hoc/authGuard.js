import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

/*
const AuthGuard = (props) => {
  const user = useSelector((state) => state.auth);
  console.log("user", user.auth);
  const location = useLocation();

  if (user.auth) {
    return props.children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AuthGuard;
*/

const Protected = ({ element: Element, isLoggedIn }) => {
  return isLoggedIn ? <Element /> : <Navigate to="/login" />;
};

export default Protected;
