const PagesInfo = ({
  currentPage,
  totalPages,
  indexOfFirstRecord,
  indexOfLastRecord,
  totalRecords,
  currentRecords,
}) => {
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

export default PagesInfo;
