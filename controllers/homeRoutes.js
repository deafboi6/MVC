const router = require("express").Router();
const { User, Blog } = require("../models/User");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    res.render("homepage", {
        logged_in: req.session.logged_in
    });
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Project }],
        });

        const user = userData.get({ plain: true });

    res.render('profile', {
        ...user,
        logged_in: true
    });
    } catch (err) {
    res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }

    res.render('login');
});

module.exports = router;