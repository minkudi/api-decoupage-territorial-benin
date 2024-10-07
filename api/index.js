const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();
const data = require('../data/decoupage_territorial_benin.json');

// Options de configuration pour swagger-jsdoc
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API de découpage territorial du Bénin',
        version: '1.0.0',
        description: 'API pour récupérer les départements, communes et arrondissements du Bénin',
      },
      servers: [
        {
          url: 'https://api-decoupage-benin.onrender.com',
        },
      ],
      components: {
        schemas: {
          Departement: {
            type: 'object',
            properties: {
              id_dep: {
                type: 'integer',
                description: 'Identifiant du département',
              },
              lib_dep: {
                type: 'string',
                description: 'Nom du département',
              },
            },
          },
          Commune: {
            type: 'object',
            properties: {
              id_com: {
                type: 'integer',
                description: 'Identifiant de la commune',
              },
              lib_com: {
                type: 'string',
                description: 'Nom de la commune',
              },
            },
          },
          Arrondissement: {
            type: 'object',
            properties: {
              id_arrond: {
                type: 'integer',
                description: 'Identifiant de l\'arrondissement',
              },
              lib_arrond: {
                type: 'string',
                description: 'Nom de l\'arrondissement',
              },
            },
          },
          Quartier: {
            type: 'object',
            properties: {
              id_quartier: {
                type: 'integer',
                description: 'Identifiant du quartier',
              },
              lib_quartier: {
                type: 'string',
                description: 'Nom du quartier',
              },
            },
          },
        },
      },
    },
    apis: ['./api/**/*.js']
  };

const specs = swaggerJsdoc(options);

app.use(cors({
    origin: 'https://tonsessi.vercel.app/', 
    methods: ['GET', 'POST', 'OPTIONS'],
  }));
  

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /departements/{id_dep}:
 *   get:
 *     summary: Récupérer un département par son ID
 *     parameters:
 *       - in: path
 *         name: id_dep
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Département trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departement'
 *       404:
 *         description: Département non trouvé
 */

// Département par ID
app.get('/departements/:id_dep', (req, res) => {
  const idDep = req.params.id_dep;
  const departement = data.find((dep) => dep.id_dep === parseInt(idDep));
  if (!departement) {
    return res.status(404).send('Département non trouvé');
  }
  return res.json(departement);
});


/**
 * @swagger
 * /departements/{id_dep}/communes:
 *   get:
 *     summary: Récupérer les communes d'un département
 *     parameters:
 *       - in: path
 *         name: id_dep
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Communes trouvées
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Commune'
 *       404:
 *         description: Département non trouvé
 */

// Communes d'un département
app.get('/departements/:id_dep/communes', (req, res) => {
  const idDep = req.params.id_dep;
  const departement = data.find((dep) => dep.id_dep === parseInt(idDep));
  if (!departement) {
    return res.status(404).send('Département non trouvé');
  }
  const communes = departement.communes;
  return res.json(communes);
});

/**
 * @swagger
 * /departements/{id_dep}/communes/{id_com}/arrondissements:
 *   get:
 *     summary: Récupérer les arrondissements d'une commune
 *     parameters:
 *       - in: path
 *         name: id_dep
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_com
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Arrondissements trouvés
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Arrondissement'
 *       404:
 *         description: Commune non trouvée
 */

// Arrondissements d'une commune
app.get('/departements/:id_dep/communes/:id_com/arrondissements', (req, res) => {
  const idDep = req.params.id_dep;
  const idCom = req.params.id_com;
  const departement = data.find((dep) => dep.id_dep === parseInt(idDep));
  if (!departement) {
    return res.status(404).send('Département non trouvé');
  }
  const commune = departement.communes.find((com) => com.id_com === parseInt(idCom));
  if (!commune) {
    return res.status(404).send('Commune non trouvée');
  }
  const arrondissements = commune.arrondissements;
  return res.json(arrondissements);
});

/**
 * @swagger
 * /departements/{id_dep}/communes/{id_com}/arrondissements/{id_arrond}/quartiers:
 *   get:
 *     summary: Récupérer les quartiers d'un arrondissement
 *     parameters:
 *       - in: path
 *         name: id_dep
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_com
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_arrond
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quartiers trouvés
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Quartier'
 *       404:
 *         description: Arrondissement non trouvé
 */

// Quartiers d'un arrondissement
app.get('/departements/:id_dep/communes/:id_com/arrondissements/:id_arrond/quartiers', (req, res) => {
  const idDep = req.params.id_dep;
  const idCom = req.params.id_com;
  const idArrond = req.params.id_arrond;
  const departement = data.find((dep) => dep.id_dep === parseInt(idDep));
  if (!departement) {
    return res.status(404).send('Département non trouvé');
  }
  const commune = departement.communes.find((com) => com.id_com === parseInt(idCom));
  if (!commune) {
    return res.status(404).send('Commune non trouvée');
  }
  const arrondissement = commune.arrondissements.find((arr) => arr.id_arrond === parseInt(idArrond));
  if (!arrondissement) {
    return res.status(404).send('Arrondissement non trouvé');
  }
  const quartiers = arrondissement.quartiers;
  return res.json(quartiers);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});