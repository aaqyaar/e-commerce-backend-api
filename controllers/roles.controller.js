const Role = require("../models/roles.model");

exports.create = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const role = await new Role({ name, permissions }).save();
    res.json({ data: role, message: "Role created successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.list = async (req, res) => {
  try {
    const roles = await Role.find({}).exec();
    res.json({ data: roles });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.readOne = async (req, res) => {
  try {
    const role = await Role.findOne({ _id: req.params.id }).exec();
    res.json({ data: role });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.update = async (req, res) => {
  try {
    const { name, permissions } = req.body.role;
    const role = await Role.findOneAndUpdate(
      { _id: req.params.id },
      { name, permissions },
      { new: true }
    ).exec();
    res.json({ data: role, message: "Role updated successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.removeOne = async (req, res) => {
  try {
    const role = await Role.findOneAndDelete({ _id: req.params.id }).exec();
    res.json({ data: role, message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.removeMany = async (req, res) => {
  try {
    const roles = await Role.deleteMany({ _id: { $in: req.body.ids } }).exec();
    res.json({ data: roles, message: "Roles deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
