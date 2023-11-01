import { Browser, Locator, Page, chromium } from 'playwright';
import { ApartmentScrapeData } from './apartment-scrape-data';

export async function scrape(
  url: string,
  numberOfApartments: number,
  headless = true
): Promise<ApartmentScrapeData[]> {
  const browser = await setupBrowser(headless);
  const page = await browser.newPage();
  page.setViewportSize({ width: 1280, height: 800 });
  // Go to first page
  await page.goto(url);

  // hide annoying cookie dialog
  await page
    .locator('.szn-cmp-dialog-container')
    .evaluate((element) => (element.style.display = 'none'));

  const apartments = await scrapePage(page);

  while (apartments.length < numberOfApartments) {
    await page.click('.paging-item .paging-next');
    const moreApartments = await scrapePage(page);

    if (moreApartments.length === 0) {
      break;
    }
    apartments.push(...moreApartments);
    console.log(
      `Scraping next ${moreApartments.length} apartments, total: ${apartments.length}`
    );
  }
  console.log(`Finished scraping ${apartments.length} apartments`);

  await page.waitForTimeout(3000); // wait for 5 seconds
  await browser.close();
  return apartments;
}

export async function scrapePage(page: Page): Promise<ApartmentScrapeData[]> {
  await page.waitForSelector('.property');

  const apartmentLocators = await page.locator('.property').all();
  const apartments = await Promise.all(
    apartmentLocators.map((apartment) => extractApartmentData(apartment))
  );
  return apartments;
}

async function extractApartmentData(
  locator: Locator
): Promise<ApartmentScrapeData> {
  const title = await locator.locator('.text-wrap h2').innerText();
  const images = await locator.locator('preact img').all();

  const imageUrls = await Promise.all(
    images.map((image) => image.getAttribute('src'))
  );
  return { title, imageUrls };
}

async function setupBrowser(headless: boolean): Promise<Browser> {
  const browser = await chromium.launch({
    headless // setting this to true will not run the UI
  });
  return browser;
}
