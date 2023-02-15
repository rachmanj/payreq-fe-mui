import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-bootstrap/Pagination";
import { getAllPayreq } from "../../store/actions/payreqAction";

const TablePagination = () => {
  const [activePage, setActivePage] = useState(null);
  const payreqs = useSelector((state) => state.payreqs.paginate);
  const dispatch = useDispatch();

  const handlePagination = (page) => {
    dispatch(getAllPayreq(page));
    setActivePage(page);
  };

  return (
    <>
      <Pagination>
        <Pagination.First onClick={() => handlePagination(1)} />

        {payreqs.links
          ? payreqs.links.map((link, index) => {
              if (link.label === "&laquo; Previous") {
                return (
                  <Pagination.Prev
                    key={index}
                    disabled={link.active}
                    onClick={() => handlePagination(activePage - 1)}
                  />
                );
              } else if (link.label === "Next &raquo;") {
                return (
                  <Pagination.Next
                    key={index}
                    disabled={activePage === payreqs.last_page}
                    onClick={() => handlePagination(activePage + 1)}
                  />
                );
              } else {
                return (
                  <Pagination.Item
                    key={index}
                    active={link.active}
                    onClick={() => handlePagination(parseInt(link.label))}
                  >
                    {link.label}
                  </Pagination.Item>
                );
              }
            })
          : null}
        <Pagination.Last onClick={() => handlePagination(payreqs.last_page)} />
      </Pagination>
    </>
  );
};

export default TablePagination;
