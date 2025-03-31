const Setting = require('../models/settingModel');

exports.updateSetting = async (req, res) => {
  try {
    const { key_name, value } = req.body;
    const setting = await Setting.findOneAndUpdate({ key_name }, { value }, { upsert: true, new: true });
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSettings = async (req, res) => {
  try {
    const settings = await Setting.find();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
