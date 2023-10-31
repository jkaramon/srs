import { Apartment } from './app/types/apartment';
import { PageInfo } from './app/types/page-info';

const API_SERVER = 'http://localhost:8080';

export async function getApartments(
  page: number,
  limit: number
): Promise<{
  data: Apartment[];
  pageInfo: PageInfo;
}> {
  const response = await fetch(
    `${API_SERVER}/apartments?page=${page}&limit=${limit}`
  );
  const json = await response.json();
  return json;
}
