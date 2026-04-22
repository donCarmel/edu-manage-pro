'use strict';
const express = require('express');
const router  = express.Router({ mergeParams: true });
//const { authenticate } = require('../middlewares/auth');
const { auth, permit } = require('../middlewares/auth'); // ← noms corrects


// Lazy resolution → ctrl est résolu au moment de l'appel, pas du require
const ctrl = () => require('../controllers/studentParentController');

// Lister les parents d'un étudiant
router.get(   '/',          auth, (...a) => ctrl().getParentsOfStudent(...a));

// Associer 1 ou N parents
router.post(  '/',          auth, (...a) => ctrl().linkParents(...a));

// Modifier isPrimary
router.patch( '/:parentId', auth, (...a) => ctrl().updateLink(...a));

// Dissocier un parent
router.delete('/:parentId', auth, (...a) => ctrl().unlinkParent(...a));

module.exports = router;