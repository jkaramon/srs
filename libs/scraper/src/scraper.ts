import { Browser, Locator, Page, chromium } from 'playwright';
import { ApartmentData } from './apartment-data';

export async function scrape(
  numberOfApartments: number
): Promise<ApartmentData[]> {
  const browser = await setupBrowser();
  const page = await browser.newPage();
  // Go to first page
  await page.goto('https://www.sreality.cz/en/search/for-sale/apartments');
  // hide cookie dialog
  await page
    .locator('.szn-cmp-dialog-container')
    .evaluate((element) => (element.style.display = 'none'));

  const apartments = await scrapePage(page);

  while (apartments.length < numberOfApartments) {
    await page.click('.paging-next');
    const moreApartments = await scrapePage(page);
    if (moreApartments.length === 0) {
      break;
    }
    apartments.push(...moreApartments);
  }

  await page.waitForTimeout(3000); // wait for 5 seconds
  await browser.close();
  return apartments;
}

export async function scrapePage(page: Page): Promise<ApartmentData[]> {
  await page.waitForSelector('.property');
  const apartmentLocators = await page.locator('.property').all();
  console.log('apartments', apartmentLocators.length);
  const apartments = await Promise.all(
    apartmentLocators.map((apartment) => extractApartmentData(apartment))
  );
  return apartments;
}

async function extractApartmentData(locator: Locator): Promise<ApartmentData> {
  const title = await locator.locator('.text-wrap h2').innerText();
  const images = await locator.locator('preact img').all();

  const imageUrls = await Promise.all(
    images.map((image) => image.getAttribute('src'))
  );
  return { title, imageUrls };
}

async function setupBrowser(): Promise<Browser> {
  const browser = await chromium.launch({
    headless: false, // setting this to true will not run the UI
  });
  return browser;
}
