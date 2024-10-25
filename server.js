const jsonServer = require('json-server');
const path = require('path');
const express = require('express');
const fs = require('fs');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const root = path.join(__dirname, 'build');
const port = process.env.PORT || 3000;

// Load db.json into memory and create a router from it
const dbData = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));
const router = jsonServer.router(dbData);

// Serve static files
server.use(express.static(root, { maxAge: 86400000 }));
server.use(middlewares);

// Serve the React frontend for defined routes
const reactRouterWhiteList = ['/create', '/edit/:itemId'];
server.get(reactRouterWhiteList, function (request, response) {
  response.sendFile(path.resolve(root, 'index.html'));
});

// Use the in-memory JSON server router under the /api route
server.use('/api', router);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
