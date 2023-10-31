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
    getApartments(1, 10).then((res) => {
      console.log(res.data);
      setApartments(res.data);
      setPageInfo(res.pageInfo);
    });
  }, []);
  return (
    <section>
      <h1>Apartment List</h1>
      <ApartmentList data={apartments} />
      <Pager currentPage={pageInfo.page} totalPages={5} />
    </section>
  );
}
