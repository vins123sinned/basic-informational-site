import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();

// create __dirname for ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = {
  root: path.join(__dirname),
};

app.get('/', (req, res) => {
  res.sendFile('index.html', options, (error) => {
    if (error) res.sendStatus(500);
  });
});

app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.get('/:name', (req, res) => {
  const fileName = `${req.params.name}.html`;

  res.sendFile(fileName, options, (error) => {
    if (error) {
      res.status(404).sendFile('404.html', options, (error) => {
        if (error) res.sendStatus(500);
      });
    }
  });
});

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
});