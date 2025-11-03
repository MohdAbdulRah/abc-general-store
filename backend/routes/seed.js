// routes/seed.js
require("dotenv").config();
const connectDB = require("../config/db");
const Product = require("../models/Product");

const products = [
  { name: "Atta (5kg)", description: "Whole wheat flour", price: 250, image: "https://images.unsplash.com/photo-1627735483792-233bf632619b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V2hlYXQlMjBGbG91cnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", category: "grocery" },
  { name: "Rice (5kg)", description: "Basmati rice", price: 450, image: "https://images.unsplash.com/photo-1625827626291-6fbd47a431ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmljZSUyMDVrZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", category: "grocery" },
  { name: "Sugar (1kg)", description: "White sugar", price: 45, image: "https://images.unsplash.com/photo-1641679103706-fc8542e2a97a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8U3VnYXIlMjAxa2d8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", category: "grocery" },
  { name: "Salt (1kg)", description: "Iodized salt", price: 25, image: "https://images.unsplash.com/photo-1584683596603-61fbfa842a47?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U2FsdCUyMDFrZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", category: "grocery" },
  { name: "Cooking Oil (1L)", description: "Sunflower oil", price: 150, image: "https://media.istockphoto.com/id/2153860882/photo/sunflower-oil-in-plastic-bottle-1l-with-label-3d-rendering.webp?a=1&b=1&s=612x612&w=0&k=20&c=Gx2MVuCejRiygcocEQ8I_4WNjghbNd3t2iM-aH1w2CQ=", category: "grocery" },
  { name: "Tea (250g)", description: "Premium tea", price: 120, image: "https://images.unsplash.com/photo-1736215900628-5802c4a23db5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFRlYSUyMHJhdyUyMDI1MGd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", category: "beverages" },
  { name: "Coffee (200g)", description: "Instant coffee", price: 160, image: "https://images.unsplash.com/photo-1702430179297-4d9825e4b827?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q29mZmVlJTIwcG93ZGVyJTIwMjUwZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", category: "beverages" },
  { name: "Biscuits (pack)", description: "Cream biscuits", price: 40, image: "https://plus.unsplash.com/premium_photo-1663046018870-dde03c0a34f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmlzY3VpdHMlMjBQYWNrfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", category: "snacks" },
  { name: "Chips", description: "Potato chips", price: 30, image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2hpcHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", category: "snacks" },
  { name: "Toothpaste", description: "Mint flavor", price: 75, image: "https://images.unsplash.com/photo-1602797844551-a8657700eaac?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRvb3RocGFzdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", category: "personal care" },
  { name: "Shampoo", description: "Herbal shampoo", price: 180, image: "https://images.unsplash.com/photo-1701992678962-41703126549c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNoYW1wb298ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", category: "personal care" },
  { name: "Soap", description: "Bath soap", price: 25, image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29hcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", category: "personal care" },
  { name: "Detergent", description: "Laundry detergent", price: 200, image: "https://images.unsplash.com/photo-1635369306367-9d891c6c1a7c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RGV0ZXJnZW50fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", category: "home" },
  { name: "Dishwash liquid", description: "Lemon", price: 80, image: "https://images.unsplash.com/photo-1585433206000-db7b7f7ee67b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RGlzaHdhc2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", category: "home" },
  { name: "Lightbulb", description: "LED 9W", price: 100, image: "https://images.unsplash.com/photo-1495291916458-c12f594151e7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fExpZ2h0QnVsYnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", category: "electronics" },
  { name: "Batteries (pack)", description: "AA batteries", price: 120, image: "https://plus.unsplash.com/premium_photo-1723773653700-90e562fd5a20?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmF0dGVyaWVzJTIwUGFja3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", category: "electronics" },
  { name: "Notebook", description: "200 pages", price: 50, image: "https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Tm90ZWJvb2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", category: "stationery" },
  { name: "Pen (pack)", description: "Ballpoint pens", price: 30, image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", category: "stationery" },
  { name: "Hand sanitizer", description: "50ml", price: 60, image: "https://images.unsplash.com/photo-1628771066235-78f074cdc9d6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEhhbmQlMjBzYW5pdGl6ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", category: "health" },
  { name: "Mask (pack 10)", description: "Disposable masks", price: 100, image: "https://images.unsplash.com/photo-1584309832315-39d404eecc77?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fE1hc2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", category: "health" }
];

const run = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Seeded products");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
