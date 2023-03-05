import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Moment from "react-moment";

import Pagination from "./pagination";
import PagesInfo from "./pagesInfo";
import SearchInput from "./searchInput";
import AddDialog from "./add_edit/add_dialog";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ApprovedTable = ({ approveds }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filteredApproveds, setFilteredApproveds] = useState(approveds.data); // [
  const [currentPage, setCurrentPage] = useState(1);

  const [openModalAdd, setOpenModalAdd] = useState(false);

  // if search is empty, show all approveds
  // search === "" ? (approveds = approveds) : (approveds = filteredApproveds);

  const recordsPerPage = 10;
  const totalPages = Math.ceil(approveds.length / recordsPerPage);
  const totalRecords = approveds.length;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = approveds.slice(indexOfFirstRecord, indexOfLastRecord);

  const onSearchChange = (value) => {
    const filteredRecords = approveds.filter(
      (approved) =>
        approved.employee.name.toLowerCase().includes(value.toLowerCase()) ||
        approved.payreq_num.toLowerCase().includes(value.toLowerCase()) ||
        approved.payreq_type.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredApproveds(filteredRecords);
  };

  const handleClickOpenModalAdd = () => {
    setOpenModalAdd(true);
  };

  return (
    <>
      <Card>
        <CardActions style={{ justifyContent: "space-between" }}>
          <Typography variant="h5">Approved Payreqs</Typography>
          {/* Search Input */}
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
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleClickOpenModalAdd}
          >
            Add New Payreq
          </Button>
          {/* <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => navigate("/approved/add")}
          >
            Add New
          </Button> */}
        </CardActions>
        <CardContent>
          <TableContainer component={Paper} elevation={3}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Employee Name</StyledTableCell>
                  <StyledTableCell align="center">Payreq No</StyledTableCell>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell align="center">Approve Date</StyledTableCell>
                  <StyledTableCell style={{ textAlign: "right" }}>
                    IDR
                  </StyledTableCell>
                  <StyledTableCell style={{ textAlign: "right" }}>
                    Days
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRecords.map((approved, index) => (
                  <StyledTableRow key={approved.id}>
                    <StyledTableCell component="th" scope="row">
                      {indexOfFirstRecord + index + 1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {approved.employee.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {approved.payreq_num}
                    </StyledTableCell>
                    <StyledTableCell>{approved.payreq_type}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Moment format="DD-MM-YYYY">
                        {approved.approve_date}
                      </Moment>
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "right" }}>
                      {approved.payreq_idr.toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "right" }}>
                      {approved.days.toLocaleString()}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions
          disableSpacing
          style={{ justifyContent: "space-between", padding: "0 20px 0 20px" }}
        >
          <PagesInfo
            approveds={approveds}
            currentPage={currentPage}
            totalPages={totalPages}
            indexOfFirstRecord={indexOfFirstRecord}
            indexOfLastRecord={indexOfLastRecord}
            totalRecords={totalRecords}
            currentRecords={currentRecords}
          />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            approveds={approveds}
            recordsPerPage={recordsPerPage}
          />
        </CardActions>
      </Card>
      <AddDialog
        openModalAdd={openModalAdd}
        setOpenModalAdd={setOpenModalAdd}
      />
    </>
  );
};

export default ApprovedTable;
