import CircularProgress from "@mui/material/CircularProgress";

import cookie from "react-cookies";

export const errorHelper = (formik, values) => ({
  error: formik.error[values] && formik.touched[values] ? true : false,
  helperText:
    formik.error[values] && formik.touched[values]
      ? formik.error[values]
      : null,
});

export const Loader = () => <CircularProgress />;

export const setTokenCookie = (token) => {
  cookie.save("payreq-token", token, { path: "/" });
};
export const getTokenCookie = () => cookie.load("payreq-token");
export const removeTokenCookie = () =>
  cookie.remove("payreq-token", { path: "/" });
export const getAuthHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${getTokenCookie()}`,
    },
  };
};
