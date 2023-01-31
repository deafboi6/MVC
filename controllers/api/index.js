const router = require("express").Router();

const blogRoutes = require("./blogRoutes");
const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/commentRoutes", commentRoutes);
router.use("/blogs", blogRoutes);
router.use("/user", userRoutes);

module.exports = router;