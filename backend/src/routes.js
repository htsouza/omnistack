const express = require('express');
const OngController = require('./constrollers/OngController');
const IncidentController = require('./constrollers/IncidentController');
const ProfileController = require('./constrollers/ProfileController');
const SessionController = require('./constrollers/SessionController');

// Para criação das Rotas 
const routes = express.Router();

// Rota para Login
routes.post('/sessions', SessionController.create);

// Lista todas as ONGs
routes.get('/ongs', OngController.index);
// Lista uma ONG específica.
routes.get('/profile', ProfileController.index);
// Cria uma ONG
routes.post('/ongs', OngController.create);
// Lista todas os Incidents (Casos)
routes.get('/incidents', IncidentController.index);
// Cria um Incident (Caso)
routes.post('/incidents', IncidentController.create);
// Deleta um Incident (Caso)
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;
