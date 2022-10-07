const SubCategory = require("../models/category.model");

exports.create = async (req, res) => {
  try {
    const { name, slug, parent } = req.body.subCategory;
    const isExist = await SubCategory.findOne({ slug }).exec();
    if (isExist)
      return res.status(500).send({ error: "Sub Category Already Exist" });
    const subCategory = await new SubCategory({ name, slug, parent }).save();
    res.json({
      data: subCategory,
      message: "Sub Category Created Successfuly",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.list = async (req, res) => {
  try {
    const subCategory = await SubCategory.find({}).populate("category").exec();
    res.json({ data: subCategory });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.readOne = async (req, res) => {
  try {
    const subCategory = await SubCategory.findOne({
      _id: req.params._id,
    })
      .populate("category")
      .exec();
    res.json({ data: subCategory });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.update = async (req, res) => {
  try {
    const { name, slug, parent, _id } = req.body.subCategory;
    const subCategory = await SubCategory.findOneAndUpdate(
      { _id },
      { name, slug, parent },
      { new: true }
    ).exec();
    res.json({
      data: subCategory,
      message: "Sub Category updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.removeOne = async (req, res) => {
  try {
    const subCat = await SubCategory.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    res.json({
      data: subCat,
      message: "Sub Category deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.removeMany = async (req, res) => {
  try {
    const subCategories = await SubCategory.deleteMany({
      _id: { $in: req.body.ids },
    }).exec();
    res.json({
      data: subCategories,
      message: "subCategories deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// ----------------------------------------------------------------------------------
// Language: javascript
