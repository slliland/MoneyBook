const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Load db.json data into memory at server start
const dbData = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));

// Serve static files from React's build directory
const root = path.join(__dirname, 'build');
app.use(express.static(root, { maxAge: 86400000 }));

// Endpoint to get items by monthCategory
app.get('/api/items', (req, res) => {
  const monthCategory = req.query.monthCategory;
  const filteredItems = dbData.items.filter(item => item.monthCategory === monthCategory);
  res.json(filteredItems);
});

// Endpoint to get all categories
app.get('/api/categories', (req, res) => {
  res.json(dbData.categories);
});

// Catch-all route to serve the React app for any other path
app.get('*', (req, res) => {
  res.sendFile(path.resolve(root, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
