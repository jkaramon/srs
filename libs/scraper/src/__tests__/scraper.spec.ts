import path = require('path');
import { ApartmentScrapeData } from '../apartment-scrape-data';
import { scrape } from '../scraper';

describe('Scraper', () => {
  let result: ApartmentScrapeData[] = [];
  beforeAll(async () => {
    const filePath = path.join(__dirname, '../fixtures/test-page.html');
    result = await scrape(`file://${filePath}`, 20);
  }, 10000);

  it('should return data array', async () => {
    expect(result).toHaveLength(20);
  });

  describe('first apartment', () => {
    it('should return correct title', async () => {
      const firstApartment = result[0];
      expect(firstApartment.title).toContain('For sale apartment 4+kt 155');
    });

    it('should return correct image urls', async () => {
      const firstApartment = result[0];
      expect(firstApartment.imageUrls).toContain('/img/camera.svg');
    });
  });
});
