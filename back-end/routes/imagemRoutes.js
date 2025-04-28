const express = require("express");
const router = express.Router();
const imagemController = require("../controllers/imagemController");
const auth = require("../middlewares/authMiddleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post("/upload", auth, upload.single("imagem"), imagemController.uploadImagemAluno);

module.exports = router;
