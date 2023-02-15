import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Card,
  CardActions,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";

const OutgoingPayreqs = () => {
  const [search, setSearch] = useState("");

  const onSearchChange = (value) => {
    //
  };

  return (
    <Card>
      <CardActions style={{ justifyContent: "space-between" }}>
        <Typography variant="h5">Outoing Payreqs</Typography>
        <Autocomplete
          id="search"
          freeSolo
          disableClearable
          options={[]}
          renderInput={(params) => (
            <TextField
              sx={{ width: 300 }}
              {...params}
              label="Search"
              variant="outlined"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
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
    </Card>
  );
};

export default OutgoingPayreqs;
