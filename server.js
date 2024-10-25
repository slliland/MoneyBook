const jsonServer = require('json-server');
const path = require('path');
const express = require('express');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const root = path.join(__dirname, 'build');

server.use(express.static(root, { maxAge: 86400000 }));
server.use(middlewares);
server.use('/api', router);
server.get('*', (req, res) => {
  res.sendFile('index.html', { root });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
