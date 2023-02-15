import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllPayreq } from "../../store/actions/payreqAction";

import PayreqList from "./listPayreqs";

const AllPayreqs = () => {
  const dispatch = useDispatch();
  const payreqs = useSelector((state) => state.payreqs.paginate);
  console.log(payreqs);

  useEffect(() => {
    if (!payreqs.data) {
      dispatch(getAllPayreq(1));
    }
  }, [dispatch]);

  return (
    <>
      <PayreqList payreqs={payreqs} />{" "}
    </>
  );
};

export default AllPayreqs;
