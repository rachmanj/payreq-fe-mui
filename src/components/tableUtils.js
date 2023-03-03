import Pagination from "react-bootstrap/Pagination";

export const PagesInfo = (props) => {
  const {
    currentPage,
    totalPages,
    indexOfFirstRecord,
    totalRecords,
    currentRecords,
  } = props;

  return (
    <>
      <div>
        <p>
          Showing {indexOfFirstRecord + 1} to{" "}
          {indexOfFirstRecord + currentRecords.length} of {totalRecords} entries
        </p>
      </div>
      <div>
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </>
  );
};

// SIMPLE TABLE PAGINATION use for local records // use with redux
export const SimpleTablePagination = (props) => {
  const { currentPage, setCurrentPage, approveds, recordsPerPage } = props;

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <Pagination>
      <Pagination.Item onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </Pagination.Item>
      <Pagination.Item
        onClick={handleNext}
        disabled={currentPage === Math.ceil(approveds.length / recordsPerPage)}
      >
        Next
      </Pagination.Item>
    </Pagination>
  );
};
