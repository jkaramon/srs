import { scrape } from '@srs/libs/scraper';
import { Apartment } from './apartment';
import { deleteApartments, insertApartments } from './repository';

export async function scrapeAndStore() {
  const pageUrl = 'https://www.sreality.cz/en/search/for-sale/apartments';
  const scrapedApartments = await scrape(pageUrl, 500);
  const apartments: Apartment[] = scrapedApartments.map((scraped) => ({
    title: scraped.title,
    image_url: scraped.imageUrls.length > 0 ? scraped.imageUrls[0] : null
  }));
  await deleteApartments();
  await insertApartments(apartments);
}
