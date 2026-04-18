"use strict";
const router = require("express").Router();
const ctrl = require("../controllers/teacherController");
const { auth } = require("../middlewares/auth");

router.use(auth);
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.get("/:id/classes", ctrl.getClasses);

module.exports = router;
