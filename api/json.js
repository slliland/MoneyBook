import { createServer } from 'http';
import { parse } from 'url';
import jsonServer from 'json-server';
import path from 'path';

const server = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api', router);

export default function handler(req, res) {
  const parsedUrl = parse(req.url, true);
  server.handle(req, res, parsedUrl);
}
