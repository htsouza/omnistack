/**
 * Notas do curso.
 */
/** 
 * Rota - Recurso
 */
 /**
  * Métodos HTTP
  * 
  * GET: Buscar uma informação do backend
  * POST: Criar uma informação no backend
  * PUT: Alterar uma informação no backend
  * DELETE: Deletar uma informação no backend
  */
 /**
  * Tipos de parâmetros
  * 
  * Query params: Parâmetros nomeados enviados na rota após o "?" (Filtros, Paginaçãom, etc..)
  * Route params: Parâmetros utilizados para identificar recursos
  */
/**
 * Tipos Bancos de dados e SGDBs
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc...
 */
/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users).select('*').where()
 */
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
