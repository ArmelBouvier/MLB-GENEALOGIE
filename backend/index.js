
const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/api', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.json(result.rows[0]);
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));

// Route signup
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Vérifie si l'utilisateur existe déjà
      const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (userCheck.rows.length > 0) {
        return res.status(400).json({ error: "Cet email est déjà utilisé." });
      }
  
      // Hash du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insertion dans la BDD
      const result = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
        [email, hashedPassword]
      );
  
      res.status(201).json({ message: "Compte créé avec succès", user: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Vérifie si l'utilisateur existe
      const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      const user = userResult.rows[0];
  
      if (!user) {
        return res.status(400).json({ error: "Email ou mot de passe incorrect." });
      }
  
      // Vérifie le mot de passe
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ error: "Email ou mot de passe incorrect." });
      }
  
      // Crée un token JWT
      const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({ message: "Connexion réussie", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  app.get("/protected", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Token manquant" });
  
    const token = authHeader.split(" ")[1];
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.json({ email: decoded.email });
    } catch (err) {
      res.status(401).json({ error: "Token invalide" });
    }
  });