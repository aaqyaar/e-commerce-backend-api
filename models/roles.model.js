const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: String, required: true }],
});

module.exports = mongoose.model("Role", schema);
