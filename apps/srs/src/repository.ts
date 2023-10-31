import { Apartment } from './apartment';
import { sql } from './db';

export async function getApartments(start: number, limit: number) {
  const result = await sql<Apartment[]>`
  select id, title, image_url
  from apartments 
  limit ${limit} offset ${start}`;
  const totalCountResult = await sql`select COUNT(*) as count from apartments`;
  const totalCount =
    totalCountResult.length > 0 ? parseInt(totalCountResult[0].count, 10) : 0;
  return { data: result, pageInfo: { start, limit, totalCount } };
}

export async function deleteApartments() {
  await sql`delete from apartments`;
}

export async function insertApartments(apartments: Apartment[]) {
  await sql`insert into apartments ${sql(apartments, 'title', 'image_url')}`;
}
