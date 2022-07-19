import React from "react";

const Pagination = ({ pagination, changePage }) => {
  const { curPage, totRecords, limit } = pagination;
  const totPages = Math.ceil(totRecords / limit) || 1;

  const canGoBackward = curPage > 1;
  const canGoForward = curPage < totPages;

  const pages = [];
  for (let i = 1; i <= totPages; i++) {
    pages.push(i);
  }

  const handleChangePage = (page) => {
    changePage(page);
  };

  return (
    <nav aria-label="...">
      <ul className="pagination pagination-sm  justify-content-center">
        <li className={`page-item ${canGoBackward ? "" : "disabled"}`}>
          <button className="page-link" onClick={() => handleChangePage(1)}>
            {"<<"}
          </button>
        </li>
        <li className={`page-item ${canGoBackward ? "" : "disabled"}`}>
          <button
            className="page-link"
            onClick={() => handleChangePage(curPage - 1)}
          >
            {"<"}
          </button>
        </li>
        <li className="page-item disabled">
          <button className="page-link">
            {`Página ${curPage} de ${totPages}`}
          </button>
        </li>
        <li className={`page-item ${canGoForward ? "" : "disabled"}`}>
          <button
            className="page-link"
            onClick={() => handleChangePage(curPage + 1)}
          >
            {">"}
          </button>
        </li>
        <li className={`page-item ${canGoForward ? "" : "disabled"}`}>
          <button
            className="page-link"
            onClick={() => handleChangePage(totPages)}
          >
            {">>"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
