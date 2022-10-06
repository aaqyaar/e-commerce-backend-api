const router = require("express").Router();

const {
  create,
  update,
  readOne,
  list,
  removeMany,
  removeOne,
} = require("../controllers/subCategory.controller");

router.post("/create-sub-category", create);
router.put("/update-sub-category", update);
router.get("/sub-category", list);
router.get("/sub-category/:_id", readOne);
router.delete("/delete-sub-category", removeOne);
router.delete("/delete-many-sub-category", removeMany);

module.exports = router;
