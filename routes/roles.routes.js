const router = require("express").Router();

const {
  create,
  list,
  readOne,
  update,
  removeOne,
  removeMany,
} = require("../controllers/roles.controller");

router.post("/create-role", create);
router.put("/update-role", update);
router.get("/roles", list);
router.get("/roles/:id", readOne);
router.delete("/delete-role/:id", removeOne);
router.post("/delete-many-roles", removeMany);

module.exports = router;
