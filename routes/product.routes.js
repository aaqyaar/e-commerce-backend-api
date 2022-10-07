const router = require("express").Router();
const {
  list,
  readOne,
  listAllProducts,
  createOrUpdateProduct,
  removeOne,
  removeMany,
} = require("../controllers/product.controller");

router.get("/products-all", listAllProducts);
router.get("/products", list);
router.get("/products/:_id", readOne);
router.post("/products", createOrUpdateProduct);
router.delete("/products/:_id", removeOne);
router.post("/delete-many-products", removeMany);

module.exports = router;
