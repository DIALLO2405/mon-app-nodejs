const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Mon App Node.js - CloudCluster PaaS</title>
      <style>
        body { font-family: Arial; background: #1F4E79; color: white; 
               display: flex; justify-content: center; align-items: center; 
               height: 100vh; margin: 0; text-align: center; }
        .card { background: #2E75B6; padding: 40px; border-radius: 12px; }
        h1 { font-size: 2em; margin-bottom: 10px; }
        p { color: #BDD7EE; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 Application Node.js</h1>
        <p>Déployée sur <strong>CloudCluster PaaS</strong></p>
        <p>Projet ESI – ING STIC 2 INFO – 2024/2025</p>
        <p>Heure serveur : ${new Date().toLocaleString('fr-FR')}</p>
      </div>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
