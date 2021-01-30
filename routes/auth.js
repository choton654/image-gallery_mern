const express = require("express");
const router = express.Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Image = require("../model/image");

// @routes  GET /api/auth
// @desc    get an user
// access   private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const userImages = await Image.find({ user: req.user.id });
    return res.json({ user, userImages });
    // res.json(user);
  } catch (error) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @routes  POST /api/auth
// @desc    auth user and get token
// access   public
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "invalid credintial" });
    }

    if (password != user.password)
      return res.status(400).json({ msg: "invalid credintial" });

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, "secret", { expiresIn: 36000 }, (err, token) => {
      if (err) throw err;
      res.json({ token, user });
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).send("server error");
  }
});

module.exports = router;
