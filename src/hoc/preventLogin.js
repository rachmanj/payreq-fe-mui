import { Navigate, useLocation } from "react-router-dom";

const PreventLogin = (props) => {
  let location = useLocation();

  return (
    <>
      {props.user.auth ? (
        <Navigate to="/dashboard" state={{ from: location }} replace />
      ) : (
        props.children
      )}
    </>
  );
};

export default PreventLogin;
