import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Moment from "react-moment";

import TablePagination from "./pagination";
import PagesInfo from "./pagesInfo";

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

const TablePayreq = ({ payreqs }) => {
  const recordNum = payreqs.from;

  return (
    <>
      <Card>
        <CardActions style={{ justifyContent: "space-between" }}>
          <Typography variant="h5">All Payreqs</Typography>
        </CardActions>
        <CardContent>
          <TableContainer component={Paper} elevation={3}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ textAlign: "right" }}>
                    #
                  </StyledTableCell>
                  <StyledTableCell>Employee Name</StyledTableCell>
                  <StyledTableCell>Payreq No</StyledTableCell>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell>ApproveD</StyledTableCell>
                  <StyledTableCell>OutgoingD</StyledTableCell>
                  <StyledTableCell>RealizeD</StyledTableCell>
                  <StyledTableCell style={{ textAlign: "right" }}>
                    IDR
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payreqs.data
                  ? payreqs.data.map((payreq, index) => (
                      <StyledTableRow key={payreq.payreq_num}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ textAlign: "right" }}
                        >
                          {recordNum + index}
                        </StyledTableCell>
                        <StyledTableCell>
                          {payreq.employee.name}
                        </StyledTableCell>
                        <StyledTableCell>{payreq.payreq_num}</StyledTableCell>
                        <StyledTableCell>{payreq.payreq_type}</StyledTableCell>
                        <StyledTableCell>
                          <Moment format="DD-MM-YYYY">
                            {payreq.approve_date}
                          </Moment>
                        </StyledTableCell>
                        <StyledTableCell>
                          {payreq.outgoing_date ? (
                            <Moment format="DD-MM-YYYY">
                              {payreq.outgoing_date}
                            </Moment>
                          ) : null}
                        </StyledTableCell>
                        <StyledTableCell>
                          {payreq.realization_date ? (
                            <Moment format="DD-MM-YYYY">
                              {payreq.realization_date}
                            </Moment>
                          ) : null}
                        </StyledTableCell>
                        <StyledTableCell style={{ textAlign: "right" }}>
                          {payreq.payreq_idr.toLocaleString()}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions
          disableSpacing
          style={{ justifyContent: "space-between", padding: "0 20px 0 20px" }}
        >
          <PagesInfo payreqs={payreqs} />
          <TablePagination payreqs={payreqs} />
        </CardActions>
      </Card>
    </>
  );
};

export default TablePayreq;
