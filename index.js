import http from 'node:http'; 
import fs from 'node:fs/promises';

const server = http.createServer(async (req, res) => {
  if (req.url === '/favicon.ico') {
    // skip favicon request that occurs every reload
    // since we have no icons for now, serve "no content" status code
    res.writeHead(204);
    return res.end;
  }

  const filePath = (req.url === '/') ? '/index' : req.url;

  try {
    const data = await fs.readFile(`.${filePath}.html`, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      try {
        const notFound = await fs.readFile('./404.html', 'utf8');
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(notFound);
      } catch {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
      }
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error');
    }
  }
});

server.listen(8080);