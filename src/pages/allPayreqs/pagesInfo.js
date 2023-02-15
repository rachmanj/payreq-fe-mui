const PagesInfo = ({ payreqs }) => {
  return (
    <>
      <div>
        <p>
          Showing {payreqs.from} to {payreqs.to} of {payreqs.total} entries
        </p>
      </div>
      <div>
        <p>
          Page {payreqs.current_page} of {payreqs.last_page}
        </p>
      </div>
    </>
  );
};

export default PagesInfo;
