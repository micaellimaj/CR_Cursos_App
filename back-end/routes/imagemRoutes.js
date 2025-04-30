const express = require("express");
const router = express.Router();
const imagemController = require("../controllers/imagemController");
const auth = require("../middlewares/authMiddleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

// ⚠️ Aqui está o provável erro:
// Verifique se "auth" está exportando uma função middleware corretamente
router.post("/upload", auth, upload.single("imagem"), imagemController.uploadImagemAluno);

module.exports = router;
