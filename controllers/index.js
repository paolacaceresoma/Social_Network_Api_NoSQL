const router = require("express").Router();
const userRoutes = require("./userController");
const thoughtRoutes = require("./thoughtController");

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);
module.exports = router;
