const { admin, db, bucket } = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const uploadImagemAluno = async (req, res) => {
  try {
    const alunoId = req.userId;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Nenhuma imagem enviada" });
    }

    const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
    const filePath = file.path;

    await bucket.upload(filePath, {
      destination: `imagensAluno/${fileName}`,
      metadata: {
        contentType: file.mimetype,
      },
    });

    const fileRef = bucket.file(`imagensAluno/${fileName}`);
    await fileRef.makePublic();

    const imageUrl = `https://storage.googleapis.com/${bucket.name}/imagensAluno/${fileName}`;

    fs.unlinkSync(filePath);

    const imageId = uuidv4();
    await admin.database().ref(`imagensAluno/${imageId}`).set({
      alunoId,
      imageUrl,
      createdAt: new Date().toISOString(),
    });

    return res.status(201).json({ message: "Imagem enviada com sucesso!", imageUrl });
  } catch (error) {
    console.error("Erro no upload de imagem:", error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

// Exportar como objeto
module.exports = {
  uploadImagemAluno,
};
