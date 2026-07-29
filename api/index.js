/**
 * ============================================================================
 * index.js — Point d'entrée de l'API
 * ============================================================================
 */

// On importe le module Express
const express = require('express')

// On importe le package CORS
const cors = require('cors')

// On importe notre routeur
const route = require('../routes/index')

// Crée une nouvelle application Express
const app = express()

// Middleware personnalisé pour intercepter TOUTES les requêtes (y compris OPTIONS)
// et appliquer la politique CORS de manière stricte sans redirection.
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Si l'origine est définie et se termine par .vercel.app ou est un localhost
  if (origin && (origin.endsWith('.vercel.app') || origin.startsWith('http://localhost:'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    // Cas des requêtes sans origine (Postman, cURL, etc.)
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Réponse immédiate aux requêtes Preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// Middleware pour lire le JSON
app.use(express.json())

// Middleware pour les formulaires HTML
app.use(express.urlencoded({ extended: true }))

// On branche notre routeur sur la racine '/'
app.use('/', route)

// On n'exécute app.listen() QUE si on est en local (pas sur Vercel)
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5500
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

// Export de l'application Express pour Vercel Serverless
module.exports = app;