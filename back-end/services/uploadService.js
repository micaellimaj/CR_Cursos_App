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

  return { fileName, path: filePath, url: `/uploads/${fileName}` };
}

function getAllFiles() {
  const files = fs.readdirSync(uploadDir);
  return files.map(fileName => ({
    name: fileName,
    url: `/uploads/${fileName}`,
  }));
}

function getFile(fileName) {
  const filePath = path.join(uploadDir, fileName);
  if (!fs.existsSync(filePath)) return null;
  return { name: fileName, path: filePath };
}

function updateFile(oldFileName, newFile) {
  const oldFilePath = path.join(uploadDir, oldFileName);
  if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);

  const fileName = generateFileName(newFile.originalname);
  const filePath = path.join(uploadDir, fileName);
  fs.writeFileSync(filePath, newFile.buffer);

  return { fileName, path: filePath, url: `/uploads/${fileName}` };
}

function deleteFile(fileName) {
  const filePath = path.join(uploadDir, fileName);
  if (!fs.existsSync(filePath)) return false;
  fs.unlinkSync(filePath);
  return true;
}

module.exports = {
  saveFile,
  getAllFiles,
  getFile,
  updateFile,
  deleteFile,
};
