/**
 * rutesCategoria.js
 * Definició de les rutes relacionades amb les categories
 */

const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/UsuariController');

/**
 * @swagger
 * /api/usuaris:
 *   post:
 *     summary: Crea un usuari seguint el patró definit
 *     description: Retorna la confirmació de creació de l'usuari
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               nom:
 *                 type: string
 *               idioma:
 *                 type: string
 *     tags: [Usuaris]
 *     responses:
 *       201:
 *         description: Usuari creat amb èxit
 *       400:
 *         description: Error en les dades proporcionades
 *       409:
 *         description: Ja existeix un usuari amb aquest nom d'usuari o email
 *       500:
 *         description: Error intern del servidor
 */
router.post('/', usuariController.creacioUsuari);

/**
 * @swagger
 * /api/usuaris/comentaris/{id_usuari}:
 *   get:
 *     summary: Obté els comentaris d'un usuari
 *     description: Retorna tots els comentaris d'un usuari, incloent informació del vídeo i del canal de YouTube associat
 *     parameters:
 *       - in: path
 *         name: id_usuari
 *         required: true
 *         description: ID del usuari
 *         schema:
 *           type: integer
 *     tags: [Usuaris]
 *     responses:
 *       200:
 *         description: Comentaris de l'usuari obtinguts amb èxit
 *       500:
 *         description: Error intern del servidor
 */
router.get('/comentaris/:id_usuari', usuariController.obtenirComentaris);

module.exports = router;