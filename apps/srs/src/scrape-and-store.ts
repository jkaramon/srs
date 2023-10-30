import { scrape } from '@srs/libs/scraper';
import postgres from 'postgres';

export async function scrapeAndStore() {
  const data = await scrape(50);
}
