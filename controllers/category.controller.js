const Category = require("../models/category.model");

exports.create = async (req, res) => {
  try {
    const { name, slug } = req.body.category;
    const isExist = await Category.findOne({ slug }).exec();
    if (isExist)
      return res.status(500).send({ error: "Category Already Exist" });
    const category = await new Category({ name, slug }).save();
    res.json({ data: category, message: "Category Created Successfuly" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.list = async (req, res) => {
  try {
    const category = await Category.find({}).exec();
    res.json({ data: category });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.readOne = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id }).exec();
    res.json({ data: category });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.update = async (req, res) => {
  try {
    const { name, slug, _id } = req.body.category;
    const category = await Category.findOneAndUpdate(
      { _id },
      { name, slug },
      { new: true }
    ).exec();
    res.json({ data: category, message: "Category updated successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.removeOne = async (req, res) => {
  try {
    const cat = await Category.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    res.json({
      data: cat,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.removeMany = async (req, res) => {
  try {
    const categories = await Category.deleteMany({
      _id: { $in: req.body.ids },
    }).exec();
    res.json({ data: categories, message: "Categories deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

// ----------------------------------------------------------------------------------
// Language: javascript
