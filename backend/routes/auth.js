const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

//Route 1:create a user using :POST "/api/auth/createUser". Doesnot require authentication.no login required
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid e-mail").isEmail(),
    body(
      "password",
      "Enter a password of length with more than 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    //if there are errors return bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //check wheather the user with same email exists already
    try {
      let user = await User.findOne({ email: req.body.email }); //this function gives us this user whose email=req.body.email
      if (user) {
        return res
          .status(400)
          .json({
            success,
            error: "Sorry a user with this email already exists",
          });
      }
      //create a new user
      const salt = await bcrypt.genSalt(10); //generates a salt
      const secPass = await bcrypt.hash(req.body.password, salt); //convert password into hash and add salt
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, "sid"); //genarate a token with data and secret key
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(success, "Some error occured");
    }
  }
);

//Route 2:authnticate a user using post "/api/auth/login". No login required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //if there are errors return bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email }); //this function gives us this user whose email=req.body.email
      if (!user) {
        return res.status(400).json({ error: "Sorry user doesnot exists" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password); //
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, "sid"); //genarate a token with data and secret key
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

//Route 3:Get logged in user details using  post "/api/auth/getUser".login required
router.post("/getUser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password"); //basically this function will search for the data whose id=userId and it will select all its data like name,email etc. excluding password
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }
});
module.exports = router;
