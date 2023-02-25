import { forwardRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { editOutgoing } from "../../store/actions/outgoingAction";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ActionButtons = ({ payreq, handleTodayActiontButtton }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openToday, setOpenToday] = useState(false);
  const [openSplit, setOpenSplit] = useState(false);
  const accounts = useSelector((state) => state.accounts.list);

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenEdit(false);
    setOpenToday(false);
    setOpenSplit(false);
  };

  // setup formik
  const formik = useFormik({
    initialValues: {
      outgoing_date: new Date().toISOString().slice(0, 10),
      account_id: "",
    },
    validationSchema: Yup.object({
      outgoing_date: Yup.date().required("Required"),
      account_id: Yup.number(),
    }),
    onSubmit: (values) => {
      dispatch(editOutgoing({ payreqId: payreq.id, values }));
      console.log(values);
      handleClose();
    },
  });

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Chip
          label="edit"
          size="small"
          color="success"
          onClick={() => setOpenEdit(true)}
        />
        <Chip
          label="today"
          size="small"
          color="warning"
          onClick={() => handleTodayActiontButtton(payreq.id)}
        />
        <Chip
          label="split"
          size="small"
          color="primary"
          onClick={() => setOpenSplit(true)}
        />
      </Stack>

      {/* DIALOG EDIT */}
      <div>
        <Dialog
          open={openEdit}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            No.{payreq.payreq_num} | {payreq.employee.name} | IDR{" "}
            {payreq.payreq_idr.toLocaleString("id-ID")}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Stack direction="row" style={{ marginTop: 10 }} spacing={1}>
                <TextField
                  id="outgoing_date"
                  label="Date"
                  variant="outlined"
                  type="date"
                  size="small"
                  value={formik.values.outgoing_date}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Account No
                  </InputLabel>
                  <Select
                    labelId="account_id"
                    id="account_id"
                    name="account_id"
                    value={formik.values.account_id}
                    label="Account"
                    onChange={formik.handleChange}
                    size="small"
                    style={{ width: 200 }}
                    InputLabelProps={{ shrink: true }}
                  >
                    {accounts
                      ? accounts.map((account) => (
                          <MenuItem key={account.id} value={account.id}>
                            {account.name + " - " + account.account_no}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </Stack>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} size="small">
              Close
            </Button>
            <Button type="submit" onClick={formik.handleSubmit} size="small">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* DIALOG SPLIT */}
      <div>
        <Dialog
          open={openSplit}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            SPLIT No.{payreq.payreq_num} | {payreq.employee.name} | IDR{" "}
            {payreq.payreq_idr.toLocaleString("id-ID")}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ActionButtons;
