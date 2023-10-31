import { Apartment } from './types/apartment';

export interface PagerProps {
  currentPage: number;
  totalPages: number;
}

export function Pager(props: PagerProps) {
  const { currentPage, totalPages } = props;
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  if (totalPages === 1) {
    return null;
  }
  return (
    <nav className="pager">
      <a href="" className="disabled">
        Previous
      </a>
      <a href="?page=1" className="current">
        1
      </a>
      <a href="?page=2">2</a>
      <a href="?page=3">3</a>
      <a href="?page=2">Next</a>
    </nav>
  );
}
