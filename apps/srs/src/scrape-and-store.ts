import { scrape } from '@srs/libs/scraper';
import { Apartment } from './apartment';
import { deleteApartments, insertApartments } from './repository';

export async function scrapeAndStore() {
  const scrapedApartments = await scrape(500);
  const apartments: Apartment[] = scrapedApartments.map((scraped) => ({
    title: scraped.title,
    image_url: scraped.imageUrls.length > 0 ? scraped.imageUrls[0] : null
  }));
  await deleteApartments();
  await insertApartments(apartments);
}
