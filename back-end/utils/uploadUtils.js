const path = require("path");
const { v4: uuidv4 } = require("uuid");

function generateFileName(originalName) {
  const extension = path.extname(originalName);
  const uniqueName = uuidv4();
  return `${uniqueName}${extension}`;
}

module.exports = {
  generateFileName,
};
