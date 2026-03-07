const { getAdminById } = require('./use-cases/getAdminById');
const { updateAdmin } = require('./use-cases/updateAdmin');

const getMe = async (req, res) => {
  try {
    const adminId = req.user.id; 
    const profile = await getAdminById(adminId);
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erro interno" });
  }
};

const updateMe = async (req, res) => {
  try {
    const adminId = req.user.id;
    const result = await updateAdmin(adminId, req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erro interno" });
  }
};

module.exports = { getMe, updateMe };