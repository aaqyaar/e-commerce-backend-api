const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, minlength: 3, maxlength: 50 },
    username: { type: String, minlength: 3, maxlength: 50 },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, minlength: 6, maxlength: 50 },
    isBlocked: { type: Boolean, required: false },
    role: {
      ref: "Role",
      type: Schema.Types.ObjectId,
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.encryptPassword = function (password) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compareSync(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
