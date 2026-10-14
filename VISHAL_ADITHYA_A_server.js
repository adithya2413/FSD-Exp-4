const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const htmlFile = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile(htmlFile, (error, html) => {
            if (error) {
                console.error('Could not load index.html:', error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 - Could not load the frontend');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
        });
    }

    // POST Request
    else if (req.method === 'POST' && req.url === '/data') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                method: 'POST',
                message: 'Data received successfully',
                data: body
            }));
        });
    }

    // PUT Request
    else if (req.method === 'PUT' && req.url === '/data') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                method: 'PUT',
                message: 'Data updated successfully',
                data: body
            }));
        });
    }

    // DELETE Request
    else if (req.method === 'DELETE' && req.url === '/data') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            method: 'DELETE',
            message: 'Data deleted successfully'
        }));
    }

    // Invalid Request
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
