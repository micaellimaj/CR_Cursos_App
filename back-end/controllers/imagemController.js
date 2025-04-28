const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const bucket = admin.storage().bucket();

exports.uploadImagemAluno = async (req, res) => {
  try {
    const alunoId = req.userId; // vem do middleware de autenticação
    const file = req.file;

    if (!file) return res.status(400).json({ message: "Nenhuma imagem enviada" });

    const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
    const filePath = file.path;

    // Upload para o Firebase Storage
    await bucket.upload(filePath, {
      destination: `imagensAluno/${fileName}`,
      metadata: {
        contentType: file.mimetype,
      },
    });

    // Torna o arquivo público (opcional)
    const fileRef = bucket.file(`imagensAluno/${fileName}`);
    await fileRef.makePublic();

    const imageUrl = `https://storage.googleapis.com/${bucket.name}/imagensAluno/${fileName}`;

    // Deleta localmente
    fs.unlinkSync(filePath);

    // Salva no Realtime Database
    const imageId = uuidv4();
    await admin.database().ref(`imagensAluno/${imageId}`).set({
      alunoId,
      imageUrl,
      createdAt: new Date().toISOString(),
    });

    return res.status(201).json({ message: "Imagem enviada!", imageUrl });
  } catch (error) {
    console.error("Erro no upload de imagem:", error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};
