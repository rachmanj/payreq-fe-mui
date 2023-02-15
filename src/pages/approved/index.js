import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllApproved } from "../../store/actions/approvedAction";
import { getAllEmployees } from "../../store/actions/employeeAction";
import { getAdvanceCategories } from "../../store/actions/advanceCategoryAction";
import { getRabs } from "../../store/actions/rabAction";

import ApprovedList from "./listApproved";

const ApprovedPayreqs = () => {
  const dispatch = useDispatch();
  const approveds = useSelector((state) => state.approveds.list);

  useEffect(() => {
    if (!approveds.data) {
      dispatch(getAllApproved());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllEmployees());
    dispatch(getAdvanceCategories());
    dispatch(getRabs());
  }, [dispatch]);

  return (
    <>
      <ApprovedList approveds={approveds} />
    </>
  );
};

export default ApprovedPayreqs;
