import { useState } from "react";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Moment from "react-moment";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import { PagesInfo, SimpleTablePagination } from "../../components/tableUtils";
import ActionButtons from "./actionButtons";

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

const ListOutgoingPayreqs = ({
  filteredOutgoings,
  handleTodayActiontButtton,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;
  const totalPages = Math.ceil(filteredOutgoings.length / recordsPerPage);
  const totalRecords = filteredOutgoings.length;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredOutgoings.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  return (
    <>
      <CardContent>
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ textAlign: "right" }}>
                  #
                </StyledTableCell>
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
                {/* action buttons */}
                <StyledTableCell style={{ textAlign: "center" }}>
                  Release
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRecords.map((payreq, index) => (
                <StyledTableRow key={payreq.id}>
                  <StyledTableCell
                    style={{ textAlign: "right" }}
                    component="th"
                    scope="row"
                  >
                    {indexOfFirstRecord + index + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {payreq.employee.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {payreq.payreq_num}
                  </StyledTableCell>
                  <StyledTableCell>{payreq.payreq_type}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Moment format="DD-MM-YYYY">{payreq.approve_date}</Moment>
                  </StyledTableCell>
                  <StyledTableCell style={{ textAlign: "right" }}>
                    {payreq.payreq_idr.toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell style={{ textAlign: "right" }}>
                    {payreq.days.toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell style={{ textAlign: "center" }}>
                    <ActionButtons
                      payreq={payreq}
                      handleTodayActiontButtton={handleTodayActiontButtton}
                    />
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
          currentPage={currentPage}
          totalPages={totalPages}
          indexOfFirstRecord={indexOfFirstRecord}
          totalRecords={totalRecords}
          currentRecords={currentRecords}
        />
        <SimpleTablePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          approveds={filteredOutgoings}
          recordsPerPage={recordsPerPage}
        />
      </CardActions>
    </>
  );
};

export default ListOutgoingPayreqs;
