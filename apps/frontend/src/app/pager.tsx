/* eslint-disable jsx-a11y/anchor-is-valid */

import classNames from 'classnames';
export interface PagerProps {
  currentPage: number;
  pageSize: number;
  totalRecords: number;
}

export function Pager(props: PagerProps) {
  const { currentPage, totalRecords, pageSize } = props;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const previousClasses = classNames('prev', {
    disabled: !hasPrevious
  });

  const nextClasses = classNames('next', {
    disabled: !hasNext
  });

  if (totalPages === 1) {
    return null;
  }

  const pages = [...Array(totalPages).keys()].map((i) => i + 1);
  const prevPage = hasPrevious ? currentPage - 1 : 1;
  const nextPage = hasNext ? currentPage + 1 : totalPages;
  return (
    <nav className="pager">
      <a href={`?page=${prevPage}`} className={previousClasses}>
        Previous
      </a>
      {pages.map((pageNumber) => (
        <a
          key={pageNumber}
          href={`?page=${pageNumber}`}
          className={classNames({ current: pageNumber === currentPage })}
        >
          {pageNumber}
        </a>
      ))}

      <a href={`?page=${nextPage}`} className={nextClasses}>
        Next
      </a>
    </nav>
  );
}
