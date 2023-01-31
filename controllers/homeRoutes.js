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

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get("/dashboard", (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    }
    
    res.render("dashboard");
})

module.exports = router;