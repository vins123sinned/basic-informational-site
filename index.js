import http from 'node:http'; 
import fs from 'node:fs';

const server = http.createServer((req, res) => {
  if (req.url !== '/favicon.ico') {
    const filePath = (req.url === '/') ? '/index' : req.url;
    fs.readFile(`.${filePath}.html`, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          fs.readFile('./404.html', 'utf8', (err, data) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Server Error');
              return;
            }

            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(data);
          });
          return;
        } else {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Server Error');
          return;
        }
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
});

server.listen(8080);