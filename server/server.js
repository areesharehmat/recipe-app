import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data.json');

const app = express();
app.use(cors());
app.use(express.json());

// Helper functions with data validation
const readData = () => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error reading data file:', error);
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Data validation middleware
const validateRecipe = (req, res, next) => {
  const recipe = req.body;
  
  if (!recipe.title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  // Ensure arrays exist and are properly formatted
  req.body = {
    ...recipe,
    ingredients: Array.isArray(recipe.ingredients) 
      ? recipe.ingredients.filter(i => i.name && i.amount)
      : [],
    instructions: Array.isArray(recipe.instructions)
      ? recipe.instructions.filter(i => i.step && i.text)
      : [],
    tags: Array.isArray(recipe.tags) 
      ? recipe.tags.filter(t => typeof t === 'string')
      : []
  };
  
  next();
};

// ───────────── ROUTES ─────────────

app.get('/api/recipes', (req, res) => {
  let recipes = readData();

  // Respect ?_limit query so home page can limit to 3
 const limit = parseInt(req.query._limit, 10);
  if (!isNaN(limit)) recipes = recipes.slice(0, limit);

  res.json(recipes);          // 🚀 must be array, not { recipes: array }
});
// GET one recipe with validation
app.get('/api/recipes/:id', (req, res) => {
  const recipes = readData();
  const recipe = recipes.find(r => r.id === req.params.id);
  
  if (!recipe) {
    return res.status(404).json({ error: 'Recipe not found' });
  }

  // Ensure all arrays exist in response
  const validatedRecipe = {
    ...recipe,
    ingredients: recipe.ingredients || [],
    instructions: recipe.instructions || [],
    tags: recipe.tags || []
  };

  res.json(validatedRecipe);
});

// POST new recipe with validation
app.post('/api/recipes', validateRecipe, (req, res) => {
  const recipes = readData();
  const newRecipe = { 
    ...req.body,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  recipes.push(newRecipe);
  writeData(recipes);
  res.status(201).json(newRecipe);
});

// PUT update recipe with validation
app.put('/api/recipes/:id', validateRecipe, (req, res) => {
  const recipes = readData();
  const index = recipes.findIndex(r => r.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Recipe not found' });
  }

  const updatedRecipe = {
    ...recipes[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  recipes[index] = updatedRecipe;
  writeData(recipes);
  res.json(updatedRecipe);
});

// DELETE recipe
app.delete('/api/recipes/:id', (req, res) => {
  let recipes = readData();
  const initialLength = recipes.length;
  
  recipes = recipes.filter(r => r.id !== req.params.id);
  
  if (recipes.length === initialLength) {
    return res.status(404).json({ error: 'Recipe not found' });
  }

  writeData(recipes);
  res.status(204).end();
});

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ───────────── START ─────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));