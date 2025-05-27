const path = require("path");
const fs = require("fs");
const { generateFileName } = require("../utils/uploadUtils");

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

function saveFile(file) {
  const fileName = generateFileName(file.originalname);
  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, file.buffer);
  
  return {
    fileName,
    path: filePath,
    url: `/uploads/${fileName}`, // se você servir os arquivos via Express
  };
}

module.exports = {
  saveFile,
};
