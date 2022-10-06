const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    slug: { type: String, required: true, minlength: 3, maxlength: 50 },
  },
  { timestamps: true }
);

const subCategorySchema = new Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    slug: { type: String, required: true, minlength: 3, maxlength: 50 },
    parent: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", schema);
module.exports = mongoose.model("SubCategory", subCategorySchema);
