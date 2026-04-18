'use strict';
const router = require('express').Router();
const ctrl   = require('../controllers/teacherQualificationController');
const { auth } = require('../middlewares/auth');

router.use(auth);

// CRUD standard
router.get   ('/',            ctrl.getAll);
router.get   ('/available',   ctrl.getAvailable);   // ← DOIT être avant /:id
router.get   ('/:id',         ctrl.getOne);
router.post  ('/',            ctrl.create);
router.put   ('/:id',         ctrl.update);
router.delete('/:id',         ctrl.remove);

module.exports = router;
