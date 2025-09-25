const uploadFile = require("../use-cases/upload/uploadFile");
const listFiles = require("../use-cases/upload/listFiles");
const getFile = require("../use-cases/upload/getFile");
const updateFile = require("../use-cases/upload/updateFile");
const deleteFile = require("../use-cases/upload/deleteFile");

module.exports = {
  uploadFile,
  listFiles,
  getFile,
  updateFile,
  deleteFile,
};

