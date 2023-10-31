import express from 'express';

import cors from 'cors';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use(express.static(path.join(__dirname, 'public')));

import { scrapeAndStore } from './scrape-and-store';
import { getApartments } from './repository';
import path from 'path';

if (process.env.RUN_MODE === 'scrape') {
  (async () => {
    await scrapeAndStore();
  })()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .then(startServer);
} else {
  startServer();
}

function startServer() {
  app.get('/apartments', async (req, res) => {
    const parsedPage = parseInt(req.query.page as string, 10);
    const parsedLimit = parseInt(req.query.limit as string, 10);
    const page = parsedPage > 0 ? parsedPage : 1;
    const limit = parsedLimit > 0 ? parsedLimit : 20;
    const start = (page - 1) * limit;
    const result = await getApartments(start, limit);
    res.send(result);
  });

  app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });
}
