const router = require("express").Router();

const blogRoutes = require("./blogRoutes");
const userRoutes = require("./userRoutes");

router.use("/blogs", blogRoutes);
router.use("/user", userRoutes);

module.exports = router;