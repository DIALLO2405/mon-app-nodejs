const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculateur de Dates | ESI STIC</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Poppins', sans-serif;
      min-height: 100vh;
      background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
      color: white;
      overflow-x: hidden;
    }

    /* Animated background stars */
    body::before {
      content: '';
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image:
        radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.3), transparent),
        radial-gradient(2px 2px at 80% 10%, rgba(255,255,255,0.2), transparent),
        radial-gradient(1px 1px at 50% 60%, rgba(255,255,255,0.4), transparent),
        radial-gradient(2px 2px at 10% 80%, rgba(255,255,255,0.2), transparent),
        radial-gradient(1px 1px at 90% 70%, rgba(255,255,255,0.3), transparent);
      pointer-events: none;
      z-index: 0;
    }

    .container {
      position: relative;
      z-index: 1;
      max-width: 900px;
      margin: 0 auto;
      padding: 30px 20px;
    }

    header {
      text-align: center;
      margin-bottom: 40px;
    }

    .logo {
      font-size: 3em;
      margin-bottom: 10px;
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    h1 {
      font-size: 2.2em;
      font-weight: 800;
      background: linear-gradient(90deg, #f093fb, #f5576c, #4facfe, #00f2fe);
      background-size: 300%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradientShift 4s ease infinite;
    }

    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .subtitle {
      color: rgba(255,255,255,0.6);
      font-size: 0.95em;
      margin-top: 5px;
    }

    /* TABS */
    .tabs {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }

    .tab-btn {
      padding: 10px 22px;
      border: 2px solid rgba(255,255,255,0.2);
      background: rgba(255,255,255,0.05);
      color: white;
      border-radius: 50px;
      cursor: pointer;
      font-family: 'Poppins', sans-serif;
      font-size: 0.9em;
      transition: all 0.3s;
      backdrop-filter: blur(10px);
    }

    .tab-btn:hover, .tab-btn.active {
      background: linear-gradient(135deg, #f093fb, #f5576c);
      border-color: transparent;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(240, 147, 251, 0.4);
    }

    /* CARDS */
    .card {
      background: rgba(255,255,255,0.07);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 24px;
      padding: 35px;
      margin-bottom: 20px;
      display: none;
      animation: slideIn 0.4s ease;
    }

    .card.active { display: block; }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .card h2 {
      font-size: 1.3em;
      margin-bottom: 25px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* INPUTS */
    .input-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: rgba(255,255,255,0.7);
      font-size: 0.9em;
      font-weight: 600;
    }

    input[type="date"], input[type="text"] {
      width: 100%;
      padding: 14px 18px;
      background: rgba(255,255,255,0.1);
      border: 2px solid rgba(255,255,255,0.2);
      border-radius: 12px;
      color: white;
      font-family: 'Poppins', sans-serif;
      font-size: 1em;
      transition: all 0.3s;
      outline: none;
    }

    input[type="date"]:focus, input[type="text"]:focus {
      border-color: #f093fb;
      background: rgba(255,255,255,0.15);
      box-shadow: 0 0 20px rgba(240, 147, 251, 0.2);
    }

    input[type="date"]::-webkit-calendar-picker-indicator {
      filter: invert(1);
      cursor: pointer;
    }

    .btn {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #f093fb, #f5576c);
      border: none;
      border-radius: 12px;
      color: white;
      font-family: 'Poppins', sans-serif;
      font-size: 1.05em;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s;
      letter-spacing: 0.5px;
    }

    .btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(245, 87, 108, 0.5);
    }

    .btn:active { transform: translateY(0); }

    /* RESULTS */
    .result {
      margin-top: 25px;
      display: none;
      animation: slideIn 0.4s ease;
    }

    .result.show { display: block; }

    .result-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
    }

    .result-card {
      background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 16px;
      padding: 20px;
      text-align: center;
      transition: transform 0.3s;
    }

    .result-card:hover { transform: scale(1.05); }

    .result-card .value {
      font-size: 2em;
      font-weight: 800;
      background: linear-gradient(135deg, #4facfe, #00f2fe);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .result-card .label {
      font-size: 0.8em;
      color: rgba(255,255,255,0.6);
      margin-top: 5px;
    }

    .highlight-box {
      background: linear-gradient(135deg, rgba(240,147,251,0.2), rgba(245,87,108,0.2));
      border: 1px solid rgba(240,147,251,0.4);
      border-radius: 16px;
      padding: 20px 25px;
      margin-bottom: 15px;
      font-size: 1.1em;
      font-weight: 600;
      text-align: center;
    }

    .highlight-box span {
      color: #f093fb;
      font-size: 1.3em;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      font-size: 0.95em;
    }

    .info-row:last-child { border-bottom: none; }
    .info-row .key { color: rgba(255,255,255,0.6); }
    .info-row .val { font-weight: 600; color: #4facfe; }

    /* Zodiac / fun facts */
    .zodiac-badge {
      display: inline-block;
      background: linear-gradient(135deg, #f093fb, #f5576c);
      border-radius: 50px;
      padding: 6px 18px;
      font-size: 0.9em;
      font-weight: 600;
      margin: 5px;
    }

    /* Two dates */
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    @media (max-width: 500px) { .two-col { grid-template-columns: 1fr; } }

    /* Footer */
    footer {
      text-align: center;
      margin-top: 40px;
      color: rgba(255,255,255,0.3);
      font-size: 0.8em;
    }

    .badge {
      display: inline-block;
      background: rgba(255,255,255,0.1);
      border-radius: 50px;
      padding: 5px 15px;
      margin: 3px;
      font-size: 0.85em;
    }
  </style>
</head>
<body>
<div class="container">

  <header>
    <div class="logo">📅</div>
    <h1>Calculateur de Dates</h1>
    <p class="subtitle">Projet ESI · ING STIC 2 INFO · 2024-2025 · Déployé sur Render PaaS</p>
  </header>

  <div class="tabs">
    <button class="tab-btn active" onclick="showTab('age')">🎂 Âge & Naissance</button>
    <button class="tab-btn" onclick="showTab('diff')">📏 Différence</button>
    <button class="tab-btn" onclick="showTab('jour')">📆 Quel jour ?</button>
    <button class="tab-btn" onclick="showTab('futur')">🚀 Date Future</button>
  </div>

  <!-- TAB 1: AGE -->
  <div class="card active" id="tab-age">
    <h2>🎂 Calculateur d'Âge</h2>
    <div class="input-group">
      <label>Ta date de naissance</label>
      <input type="date" id="birthdate" max="">
    </div>
    <button class="btn" onclick="calcAge()">✨ Calculer mon âge</button>
    <div class="result" id="result-age">
      <div class="highlight-box" id="age-day-text"></div>
      <div class="result-grid" id="age-grid"></div>
      <div id="age-details"></div>
      <div style="text-align:center; margin-top:15px;" id="age-badges"></div>
    </div>
  </div>

  <!-- TAB 2: DIFF -->
  <div class="card" id="tab-diff">
    <h2>📏 Différence entre deux dates</h2>
    <div class="two-col">
      <div class="input-group">
        <label>Date de début</label>
        <input type="date" id="date1">
      </div>
      <div class="input-group">
        <label>Date de fin</label>
        <input type="date" id="date2">
      </div>
    </div>
    <button class="btn" onclick="calcDiff()">📏 Calculer la différence</button>
    <div class="result" id="result-diff">
      <div class="result-grid" id="diff-grid"></div>
      <div id="diff-details"></div>
    </div>
  </div>

  <!-- TAB 3: QUEL JOUR -->
  <div class="card" id="tab-jour">
    <h2>📆 Quel jour de la semaine ?</h2>
    <div class="input-group">
      <label>Entre n'importe quelle date</label>
      <input type="date" id="anydate">
    </div>
    <button class="btn" onclick="calcJour()">🔍 Trouver le jour</button>
    <div class="result" id="result-jour">
      <div class="highlight-box" id="jour-result"></div>
      <div id="jour-details"></div>
    </div>
  </div>

  <!-- TAB 4: DATE FUTURE -->
  <div class="card" id="tab-futur">
    <h2>🚀 Calculer une date future/passée</h2>
    <div class="input-group">
      <label>Date de départ</label>
      <input type="date" id="startdate">
    </div>
    <div class="two-col">
      <div class="input-group">
        <label>Nombre de jours</label>
        <input type="text" id="nbjours" placeholder="ex: 100">
      </div>
      <div class="input-group">
        <label>Direction</label>
        <select id="direction" style="width:100%;padding:14px 18px;background:rgba(255,255,255,0.1);border:2px solid rgba(255,255,255,0.2);border-radius:12px;color:white;font-family:Poppins,sans-serif;font-size:1em;outline:none;">
          <option value="1">➕ Dans le futur</option>
          <option value="-1">➖ Dans le passé</option>
        </select>
      </div>
    </div>
    <button class="btn" onclick="calcFutur()">🚀 Calculer</button>
    <div class="result" id="result-futur">
      <div class="highlight-box" id="futur-result"></div>
      <div id="futur-details"></div>
    </div>
  </div>

  <footer>
    <p>🌍 Déployé sur <strong>Render PaaS</strong> · Propulsé par <strong>Node.js + Express</strong></p>
    <p style="margin-top:8px;">
      <span class="badge">📦 Docker</span>
      <span class="badge">🟢 Node.js 20</span>
      <span class="badge">⚡ Express.js</span>
      <span class="badge">☁️ Render Cloud</span>
    </p>
  </footer>

</div>

<script>
  // Set max date to today
  document.getElementById('birthdate').max = new Date().toISOString().split('T')[0];

  const JOURS = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
  const MOIS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  const SAISONS = ['❄️ Hiver','🌸 Printemps','☀️ Été','🍂 Automne'];
  const ZODIAC = [
    {s:'Capricorne',e:[1,19]},{s:'Verseau',e:[2,18]},{s:'Poissons',e:[3,20]},
    {s:'Bélier',e:[4,19]},{s:'Taureau',e:[5,20]},{s:'Gémeaux',e:[6,20]},
    {s:'Cancer',e:[7,22]},{s:'Lion',e:[8,22]},{s:'Vierge',e:[9,22]},
    {s:'Balance',e:[10,22]},{s:'Scorpion',e:[11,21]},{s:'Sagittaire',e:[12,31]},
  ];
  const ZODIAC_EMO = {
    'Capricorne':'♑','Verseau':'♒','Poissons':'♓','Bélier':'♈',
    'Taureau':'♉','Gémeaux':'♊','Cancer':'♋','Lion':'♌','Vierge':'♍',
    'Balance':'♎','Scorpion':'♏','Sagittaire':'♐'
  };

  function showTab(id) {
    document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
    event.target.classList.add('active');
  }

  function getZodiac(m, d) {
    for (let z of ZODIAC) {
      if (m < z.e[0] || (m === z.e[0] && d <= z.e[1])) return z.s;
    }
    return 'Capricorne';
  }

  function getSaison(m) {
    if (m >= 3 && m <= 5) return SAISONS[1];
    if (m >= 6 && m <= 8) return SAISONS[2];
    if (m >= 9 && m <= 11) return SAISONS[3];
    return SAISONS[0];
  }

  function formatDate(d) {
    return d.getDate() + ' ' + MOIS[d.getMonth()] + ' ' + d.getFullYear();
  }

  function calcAge() {
    const val = document.getElementById('birthdate').value;
    if (!val) return alert('Veuillez entrer une date de naissance !');
    const birth = new Date(val);
    const now = new Date();
    if (birth > now) return alert('La date de naissance ne peut pas être dans le futur !');

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }

    const totalDays = Math.floor((now - birth) / 86400000);
    const totalHours = totalDays * 24;
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMinutes = totalHours * 60;

    // Prochain anniversaire
    let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= now) nextBirthday.setFullYear(now.getFullYear() + 1);
    const daysUntilBirthday = Math.ceil((nextBirthday - now) / 86400000);

    const jourNaissance = JOURS[birth.getDay()];
    const zodiac = getZodiac(birth.getMonth() + 1, birth.getDate());
    const saison = getSaison(birth.getMonth() + 1);

    document.getElementById('age-day-text').innerHTML =
      'Tu es né(e) un <span>' + jourNaissance + ' ' + formatDate(birth) + '</span>';

    document.getElementById('age-grid').innerHTML = \`
      <div class="result-card"><div class="value">\${years}</div><div class="label">Années</div></div>
      <div class="result-card"><div class="value">\${months}</div><div class="label">Mois</div></div>
      <div class="result-card"><div class="value">\${days}</div><div class="label">Jours</div></div>
      <div class="result-card"><div class="value">\${totalWeeks.toLocaleString('fr')}</div><div class="label">Semaines vécues</div></div>
      <div class="result-card"><div class="value">\${totalDays.toLocaleString('fr')}</div><div class="label">Jours vécus</div></div>
      <div class="result-card"><div class="value">\${totalHours.toLocaleString('fr')}</div><div class="label">Heures vécues</div></div>
    \`;

    document.getElementById('age-details').innerHTML = \`
      <div class="info-row"><span class="key">⏰ Minutes vécues</span><span class="val">\${totalMinutes.toLocaleString('fr')}</span></div>
      <div class="info-row"><span class="key">🎂 Prochain anniversaire dans</span><span class="val">\${daysUntilBirthday} jours (\${formatDate(nextBirthday)})</span></div>
      <div class="info-row"><span class="key">🌍 Saison de naissance</span><span class="val">\${saison}</span></div>
    \`;

    document.getElementById('age-badges').innerHTML =
      \`<div class="zodiac-badge">\${ZODIAC_EMO[zodiac]} \${zodiac}</div>\`;

    document.getElementById('result-age').classList.add('show');
  }

  function calcDiff() {
    const v1 = document.getElementById('date1').value;
    const v2 = document.getElementById('date2').value;
    if (!v1 || !v2) return alert('Veuillez entrer les deux dates !');
    const d1 = new Date(v1), d2 = new Date(v2);
    const diff = Math.abs(d2 - d1);
    const totalDays = Math.floor(diff / 86400000);
    const weeks = Math.floor(totalDays / 7);
    const months = Math.floor(totalDays / 30.44);
    const years = Math.floor(totalDays / 365.25);
    const hours = totalDays * 24;
    const earlier = d1 < d2 ? d1 : d2;
    const later = d1 < d2 ? d2 : d1;

    document.getElementById('diff-grid').innerHTML = \`
      <div class="result-card"><div class="value">\${years}</div><div class="label">Années</div></div>
      <div class="result-card"><div class="value">\${months}</div><div class="label">Mois</div></div>
      <div class="result-card"><div class="value">\${weeks.toLocaleString('fr')}</div><div class="label">Semaines</div></div>
      <div class="result-card"><div class="value">\${totalDays.toLocaleString('fr')}</div><div class="label">Jours</div></div>
      <div class="result-card"><div class="value">\${hours.toLocaleString('fr')}</div><div class="label">Heures</div></div>
    \`;

    document.getElementById('diff-details').innerHTML = \`
      <div class="info-row"><span class="key">📅 Du</span><span class="val">\${JOURS[earlier.getDay()]} \${formatDate(earlier)}</span></div>
      <div class="info-row"><span class="key">📅 Au</span><span class="val">\${JOURS[later.getDay()]} \${formatDate(later)}</span></div>
    \`;

    document.getElementById('result-diff').classList.add('show');
  }

  function calcJour() {
    const val = document.getElementById('anydate').value;
    if (!val) return alert('Veuillez entrer une date !');
    const d = new Date(val);
    const jour = JOURS[d.getDay()];
    const zodiac = getZodiac(d.getMonth() + 1, d.getDate());
    const saison = getSaison(d.getMonth() + 1);
    const isLeap = (d.getFullYear() % 4 === 0 && d.getFullYear() % 100 !== 0) || d.getFullYear() % 400 === 0;
    const dayOfYear = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);

    document.getElementById('jour-result').innerHTML =
      'Le <span>\${formatDate(d)}</span> était un <span>\${jour}</span>';
    document.getElementById('jour-result').innerHTML =
      \`Le <span>\${formatDate(d)}</span> était un <span>\${jour}</span>\`;

    document.getElementById('jour-details').innerHTML = \`
      <div class="info-row"><span class="key">📅 Jour de l'année</span><span class="val">Jour numéro \${dayOfYear}</span></div>
      <div class="info-row"><span class="key">🌍 Saison</span><span class="val">\${saison}</span></div>
      <div class="info-row"><span class="key">✨ Signe du zodiaque</span><span class="val">\${ZODIAC_EMO[zodiac]} \${zodiac}</span></div>
      <div class="info-row"><span class="key">🔄 Année bissextile ?</span><span class="val">\${isLeap ? '✅ Oui' : '❌ Non'}</span></div>
      <div class="info-row"><span class="key">📆 Numéro de semaine</span><span class="val">Semaine \${Math.ceil(dayOfYear / 7)}</span></div>
    \`;

    document.getElementById('result-jour').classList.add('show');
  }

  function calcFutur() {
    const val = document.getElementById('startdate').value;
    const nb = parseInt(document.getElementById('nbjours').value);
    const dir = parseInt(document.getElementById('direction').value);
    if (!val) return alert('Veuillez entrer une date de départ !');
    if (isNaN(nb) || nb < 0) return alert('Veuillez entrer un nombre de jours valide !');

    const start = new Date(val);
    const result = new Date(start.getTime() + dir * nb * 86400000);
    const jourStart = JOURS[start.getDay()];
    const jourResult = JOURS[result.getDay()];

    document.getElementById('futur-result').innerHTML =
      \`\${dir > 0 ? 'Dans' : 'Il y a'} <span>\${nb} jours</span> depuis le \${jourStart} \${formatDate(start)}<br>
      ➡️ <span>\${jourResult} \${formatDate(result)}</span>\`;

    const saison = getSaison(result.getMonth() + 1);
    const zodiac = getZodiac(result.getMonth() + 1, result.getDate());

    document.getElementById('futur-details').innerHTML = \`
      <div class="info-row"><span class="key">🌍 Saison à cette date</span><span class="val">\${saison}</span></div>
      <div class="info-row"><span class="key">✨ Signe du zodiaque</span><span class="val">\${ZODIAC_EMO[zodiac]} \${zodiac}</span></div>
      <div class="info-row"><span class="key">📅 Jour de la semaine</span><span class="val">\${jourResult}</span></div>
    \`;

    document.getElementById('result-futur').classList.add('show');
  }
</script>
</body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
