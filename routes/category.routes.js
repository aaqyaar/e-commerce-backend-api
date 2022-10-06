const router = require("express").Router();

const {
  create,
  list,
  readOne,
  update,
  removeOne,
  removeMany,
} = require("../controllers/category.controller");

router.post("/create-category", create);
router.put("/update-category", update);
router.get("/category", list);
router.get("/category/:id", readOne);
router.delete("/delete-category/:id", removeOne);
router.delete("/delete-many-category", removeMany);

module.exports = router;
