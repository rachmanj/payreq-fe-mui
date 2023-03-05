import { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import {
  IconButton,
  Toolbar,
  AppBar,
  Dialog,
  Autocomplete,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { validationSchema } from "./validationSchema";

import { createApproved } from "../../../store/actions/approvedAction";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddDialog = ({ openModalAdd, setOpenModalAdd }) => {
  const employees = useSelector((state) => state.employees.list);
  const advanceCategories = useSelector(
    (state) => state.advanceCategories.list
  );
  const rabs = useSelector((state) => state.rabs.list);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      employeeName: "",
      payreqNo: "",
      isBudgeted: "yes",
      approvedDate: new Date().toISOString().slice(0, 10),
      payreqType: "Advance",
      priority: 1,
      advanceCategory: "",
      amount: "",
      rabId: "",
      remarks: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // get employee id
      const selectedEmployee = employees.find(
        (employee) => employee.name === values.employeeName
      );
      // get advance category id
      const selectedAdvanceCategory = advanceCategories.find(
        (advanceCategory) =>
          advanceCategory.description === values.advanceCategory
      );

      const sentValues = {
        user_id: selectedEmployee.id,
        payreq_num: values.payreqNo,
        budgeted: values.isBudgeted === "yes" ? 1 : 0,
        approve_date: values.approvedDate,
        payreq_type: values.payreqType,
        que_group: values.priority,
        payreq_idr: parseFloat(values.amount),
        advance_category_id: selectedAdvanceCategory.id,
        remarks: values.remarks,
      };

      // get rab id if rabNo is not empty
      if (values.rabId !== "") {
        const selectedRab = rabs.find((rab) => rab.rab_no === values.rabId);
        sentValues.rab_id = selectedRab.id;
      }
      console.log("sentValues", sentValues);
      dispatch(createApproved(sentValues));

      navigate("/approved");
    },
  });

  const handleClose = () => {
    setOpenModalAdd(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={openModalAdd}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add New Payment Request
            </Typography>
            <Button autoFocus color="inherit" onClick={formik.handleSubmit}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        {/* Form */}
        <Card>
          <CardContent>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ mb: 2 }}
            >
              <Grid item xs={4}>
                <Autocomplete
                  id="employeeName"
                  name="employeeName"
                  options={employees}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) => {
                    formik.setFieldValue("employeeName", value.name);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Employee Name"
                      variant="outlined"
                      error={
                        formik.touched.employeeName &&
                        Boolean(formik.errors.employeeName)
                      }
                      helperText={
                        formik.touched.employeeName &&
                        formik.errors.employeeName
                      }
                    />
                  )}
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Payreq No"
                  name="payreqNo"
                  value={formik.values.payreqNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.errors.payreqNo && formik.touched.payreqNo
                  )}
                  helperText={
                    formik.errors.payreqNo &&
                    formik.touched.payreqNo &&
                    formik.errors.payreqNo
                  }
                  //   sx={{ mr: 2 }}
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FormLabel sx={{ mr: 2 }}>is Budgeted?</FormLabel>
                  <RadioGroup
                    row
                    aria-label="isBudgeted"
                    name="isBudgeted"
                    value={formik.values.isBudgeted}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ mb: 2 }}
            >
              <Grid item xs={4}>
                <FormControl sx={{ minWidth: 120 }}>
                  <TextField
                    label="Approved Date"
                    name="approvedDate"
                    type="date"
                    value={formik.values.approvedDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(
                      formik.errors.approvedDate && formik.touched.approvedDate
                    )}
                    size="small"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    helperText={
                      formik.errors.approvedDate &&
                      formik.touched.approvedDate &&
                      formik.errors.approvedDate
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel id="payreqType">Type</InputLabel>
                  <Select
                    labelId="payreqType"
                    id="payreqType"
                    value={formik.values.payreqType}
                    label="Type"
                    onChange={formik.handleChange}
                    size="small"
                    defaultValue={formik.values.type}
                    name="payreqType"
                  >
                    <MenuItem value="Advance">Advance</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel id="priority">Priority</InputLabel>
                  <Select
                    labelId="priority"
                    id="priority"
                    value={formik.values.priority}
                    label="Priority"
                    onChange={formik.handleChange}
                    size="small"
                    defaultValue={formik.values.type}
                    name="priority"
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ mb: 2 }}
            >
              <Grid item xs={4}>
                <FormControl sx={{ minWidth: 120 }}>
                  <TextField
                    label="Amount"
                    name="amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(
                      formik.errors.amount && formik.touched.amount
                    )}
                    helperText={
                      formik.errors.amount &&
                      formik.touched.amount &&
                      formik.errors.amount
                    }
                    sx={{ mr: 2 }}
                    size="small"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  id="advanceCategory"
                  name="advanceCategory"
                  options={advanceCategories}
                  getOptionLabel={(option) => option.description}
                  onChange={(event, value) => {
                    formik.setFieldValue("advanceCategory", value.description);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Advance Category"
                      variant="outlined"
                      error={
                        formik.touched.advanceCategory &&
                        Boolean(formik.errors.advanceCategory)
                      }
                      helperText={
                        formik.touched.advanceCategory &&
                        formik.errors.advanceCategory
                      }
                    />
                  )}
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  id="rabId"
                  name="rabId"
                  options={rabs}
                  getOptionLabel={(option) => option.rab_no}
                  onChange={(event, value) => {
                    formik.setFieldValue("rabId", value.rab_no);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="RAB No" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Remarks"
                    name="remarks"
                    value={formik.values.remarks}
                    onChange={formik.handleChange}
                    sx={{ mr: 2 }}
                    size="small"
                    multiline
                  />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>

          {/* <CardActions>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              onClick={formik.handleSubmit}
              size="small"
              disabled={formik.isSubmitting}
            >
              Submit
            </Button>
          </CardActions> */}
        </Card>
        {/* Form */}
      </Dialog>
    </div>
  );
};

export default AddDialog;
