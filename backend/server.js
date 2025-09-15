const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Sample products
const products = [
  { name: "iPhone 13", price: 499 },
  { name: "Samsung Galaxy S22", price: 450 },
  { name: "OnePlus 10", price: 400 },
  { name: "Pixel 7", price: 480 },
  { name: "MacBook Air", price: 900 },
  { name: "Dell XPS 13", price: 850 }
];

// AI-like recommendation
app.post("/recommend-ai", (req, res) => {
  const preference = req.body.preference.toLowerCase();

  // Extract number from text (like $500)
  const match = preference.match(/\d+/); // find number in string
  const maxPrice = match ? parseInt(match[0]) : Infinity;

  const result = products.filter(p => {
    if (preference.includes("phone") && p.price <= maxPrice) return true;
    if (preference.includes("laptop") && p.price <= maxPrice) return true;
    return false;
  });

  res.json(result);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
