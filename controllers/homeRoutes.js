const router = require("express").Router();
const { User, Blog, Comments } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name"]
                }
            ]
    });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render("homepage", {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/blogCreate", withAuth, (req, res) => {
    if(req.session.logged_in) {
        res.render("blog-create", {
            logged_in: req.session.logged_in
        });
        return;
    }

    res.render("login");
});

router.get("/blog/:id", async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"]
                }
            ]
        });

        const blog = blogData.get({ plain: true });

        res.render("singleBlog", {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const dbUserData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
            include: [{ model: Blog }]
        });

        const user = dbUserData.get({ plain: true });

        res.render("dashboard", {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }



})

module.exports = router;