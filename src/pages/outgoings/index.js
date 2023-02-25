import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import {
  Card,
  CardActions,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";

import {
  getOutgoings,
  todayOutgoing,
} from "../../store/actions/outgoingAction";
import { getAccounts } from "../../store/actions/accountAction";

import ListOutgoings from "./listOutgoings";

const OutgoingPayreqs = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const outgoings = useSelector((state) => state.outgoings.list);

  useEffect(() => {
    dispatch(getOutgoings());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  const filteredOutgoings = searchInput
    ? outgoings.filter((outgoing) => {
        return (
          outgoing.employee.name
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          outgoing.payreq_num
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          outgoing.payreq_type.toLowerCase().includes(searchInput.toLowerCase())
        );
      })
    : outgoings;

  const handleTodayActiontButtton = (payreqId) => {
    dispatch(todayOutgoing(payreqId));
    // reload state
    dispatch(getOutgoings());
  };

  console.log("outgoings", outgoings);
  console.log("filteredOutgoings", filteredOutgoings);
  console.log("searchInput", searchInput);

  return (
    <Card>
      <CardActions style={{ justifyContent: "space-between" }}>
        <Typography variant="h5">Outgoing Payreqs</Typography>
        <Autocomplete
          id="searchInput"
          freeSolo
          disableClearable
          options={[]}
          renderInput={(params) => (
            <TextField
              sx={{ width: 300 }}
              {...params}
              label="Search"
              variant="outlined"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              size="small"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </CardActions>
      <Outlet />
      <ListOutgoings
        filteredOutgoings={filteredOutgoings}
        handleTodayActiontButtton={handleTodayActiontButtton}
      />
    </Card>
  );
};

export default OutgoingPayreqs;
