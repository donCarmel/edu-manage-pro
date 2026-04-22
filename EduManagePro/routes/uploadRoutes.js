// routes/uploadRoutes.js
"use strict";

const express = require("express");
const path = require("path");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

router.post("/photo", upload.single("photo"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Aucun fichier reçu" });

  // URL publique renvoyée au frontend
  const photoUrl = `/uploads/photos/${req.file.filename}`;
  return res.status(200).json({ photoUrl });
});

module.exports = router;
