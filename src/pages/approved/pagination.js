import Pagination from "react-bootstrap/Pagination";

const TablePagination = ({
  currentPage,
  setCurrentPage,
  approveds,
  recordsPerPage,
}) => {
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

export default TablePagination;
