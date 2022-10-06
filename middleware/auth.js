const { JWT } = require("../config/JWT");
const Role = require("../models/roles.model");
const User = require("../models/user.model");

const getPermissions = (role) => {
  const r = Role.findOne({ name: role }).exec();
  return r.permissions;
};

exports.isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.isAuthorized = (...permissions) => {
  return async (req, res, next) => {
    try {
      const { email } = req.user;
      const user = await User.findOne({ email }).exec();

      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      if (!user.role)
        return res.status(404).send({ error: "User role not found" });

      let userPermissions = await getPermissions(user.role);

      if (
        user &&
        permissions.every((permission) => userPermissions.includes(permission))
      )
        return next();
      res.status(403).json({ message: "Forbidden" });
    } catch (error) {
      res.status(500).send(error);
    }
  };
};
