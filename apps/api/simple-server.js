const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API Server is running!' });
});

// In-memory storage for salons (in a real app, this would be a database)
let salons = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2098&q=80",
    name: "Gül Bahçesi Balo Salonu",
    capacity: 300,
    slug: "gul-bahcesi-balo-salonu",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    name: "Kristal Teras",
    capacity: 150,
    slug: "kristal-teras",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    name: "Bahçe Terası",
    capacity: 200,
    slug: "bahce-terasi",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET /salons - List all salons
app.get('/salons', (req, res) => {
  console.log('Serving salons data:', salons.length, 'salons');
  res.json(salons);
});

// POST /salons - Create a new salon
app.post('/salons', (req, res) => {
  const { name, slug, capacity, imageUrl } = req.body;
  
  // Validate required fields
  if (!name || !slug || !capacity || !imageUrl) {
    return res.status(400).json({ 
      error: 'All fields are required: name, slug, capacity, imageUrl' 
    });
  }
  
  // Validate image URL format
  if (!imageUrl.startsWith('https://')) {
    return res.status(400).json({ 
      error: 'Image URL must start with https://' 
    });
  }
  
  // Check if slug already exists
  if (salons.find(salon => salon.slug === slug)) {
    return res.status(409).json({ 
      error: 'A salon with this slug already exists' 
    });
  }
  
  // Create new salon
  const newSalon = {
    id: String(Date.now()), // Simple ID generation
    name,
    slug,
    capacity: parseInt(capacity, 10),
    imageUrl,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  salons.push(newSalon);
  
  console.log('Created new salon:', newSalon.name);
  res.status(201).json(newSalon);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Simple API server running on http://localhost:${PORT}`);
  console.log(`📋 Salons endpoint: http://localhost:${PORT}/salons`);
});
