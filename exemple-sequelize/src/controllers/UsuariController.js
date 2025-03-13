const { UsuariYoutube,Comentari,Video,Youtuber } = require('../models');
const { logger } = require('../config/logger');

/**
 * Crea usuaris seguint el patro definit
 * @param {Object} req - Objecte de petició
 * @param {Object} res - Objecte de resposta
 * @param {Function} next - Funció següent del middleware
 */
const creacioUsuari = async (req, res, next) => {
    try {
        logger.info('Petició per a crear un usuari');

        const { username, email, password, nom, idioma } = req.body;

        // Check nom
        if (!username || username.length < 3) {
            return res.status(400).json({
                ok: false,
                codi:"ERROR_DUPLICAT",
                missatge: "Les dades proporcionades no compleixen els requisits",
                detalls: {
                    camp: "username",
                    email: "El nom d'usuari ha de tenir com a mínim 3 caràcters"
                }
            });
        }

        // Check email
        const usuariExistMail = await UsuariYoutube.findOne({ where: { email } });
        const usuariExistUsername = await UsuariYoutube.findOne({ where: { username } });
        if (usuariExistMail || usuariExistUsername) {

            var errorCamp = usuariExistMail ? "email" : "username";
            var errorMissatge = usuariExistMail ? "Aquest email ja està registrat" : "Aquest nom d'usuari ja està registrat";

            return res.status(409).json({
                ok: false,
                codi:"ERROR_DUPLICAT",
                missatge: "Ja existeix un usuari amb aquest nom d'usuari o email",
                detalls: {
                    camp: errorCamp,
                    email: errorMissatge
                }
            });
        }

        const nouUsuari = await UsuariYoutube.create({ username, email, password, nom, idioma });

        res.status(201).json({
            ok: true,
            missatge: 'Usuari creat amb èxit',
            resultat: nouUsuari
        });
    } catch (error) {
        logger.error('Error creant el usuari:', error);
        next(error);
    }
};

/**
 * Obtenir comentaris d'un usuari
 * @param {Object} req - Objecte de petició
 * @param {Object} res - Objecte de resposta
 * @param {Function} next - Funció següent del middleware
 */       
const obtenirComentaris = async (req, res, next) => {
    try {
        logger.info("Petició per a obtenir comentaris d'un usuari");

        const { id_usuari } = req.params;

        const comentaris = await Comentari.findAll({
            where: { usuari_id: id_usuari },
            include: {
                model: Video,
                include: {
                    model: Youtuber,
                    attributes: ['nom_canal']
                },
                attributes: ['id', 'titol', 'url_video']
            }
        });

        res.status(200).json({
            ok: true,
            missatge: "Comentaris de l'usuari obtinguts amb èxit",
            resultat: comentaris
        });
    } catch (error) {
        logger.error("Error obtenint els comentaris de l'usuari:", error);
        next(error);
    }
};

module.exports = {
    creacioUsuari,
    obtenirComentaris
};
