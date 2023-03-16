import React from 'react';
import { useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export default function Paginate({ page = 1, totalPage }) {
  const history = useHistory();

  function handlePageClick({ selected }) {
    const currentPage = isNaN(page) ? 1 : selected + 1;

    const prefixer = window.location.search ? '&' : '?';

    const urlParams = page
      ? window.location.search.replace(`page=${page}`, `page=${currentPage}`)
      : `${window.location.search}${prefixer}page=${currentPage}`;

    history.push(urlParams);
  }

  if (totalPage < 1) return <noscript />;
  return (
    <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={totalPage}
      initialPage={page - 1}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={'pagination center'}
      activeClassName={'active'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
    />
  );
}
