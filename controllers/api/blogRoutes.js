const router = require("express").Router();
const { Blog } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/", withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!blogData) {
            res.status(400).json({ message: "delete failed" });
            return;
        }

        res.status(200).json({ message: "deleted post" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;