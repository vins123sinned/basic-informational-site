import http from 'node:http';
import fs from 'node:fs';
import url from 'node:url';

const server = http.createServer((req, res) => {
  fs.readFile('./index.html', 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

server.listen(8080);