import { useEffect, useState } from 'react';
import { getApartments } from '../api';
import { Apartment } from './types/apartment';
import { ApartmentList } from './apartment-list';
import { Pager } from './pager';
import { PageInfo } from './types/page-info';

export function App() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    limit: 10,
    page: 1,
    totalCount: 0
  });
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page') || '1', 10);
    getApartments(page, 50).then((res) => {
      setApartments(res.data);
      setPageInfo({ ...res.pageInfo, page });
    });
  }, []);
  return (
    <section className="list">
      <header>
        <h1>Apartment List</h1>
      </header>
      <section className="content">
        <ApartmentList data={apartments} />
      </section>
      <footer>
        <Pager
          pageSize={pageInfo.limit}
          currentPage={pageInfo.page}
          totalRecords={pageInfo.totalCount}
        />
      </footer>
    </section>
  );
}
