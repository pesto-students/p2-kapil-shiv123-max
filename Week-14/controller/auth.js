const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

const generateJwtToken = (_id, secret = process.env.JWT_SECRET) => {
  return jwt.sign(
    {
      _id,
    },
    secret,
    {
      expiresIn: "1d",
    }
  );
};

const signup = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        error: "User already registered",
        message: "User already registered ✘",
      });

    const { firstName, lastName, email, password } = req.body;
    const hashed_password = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      hashed_password,
      username: shortid.generate(),
    });

    newUser.save((error, user) => {
      if (error) {
        return res.status(500).json({
          message: "Something went wrong ✘",
          error,
        });
      }

      if (user) {
        const token = generateJwtToken(user._id);
        const { _id, firstName, lastName, email, fullName } = user;
        return res.status(201).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            fullName,
          },
          message: "Signed up ✔",
        });
      }
    });
  });
};

const signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec(async (error, user) => {
    if (error)
      return res.status(400).json({
        error,
      });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword) {
        const token = generateJwtToken(user._id, user.role);
        const { _id, firstName, lastName, email, fullName } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            fullName,
          },
          message: "Logged in ✔",
        });
      } else {
        return res.status(500).json({
          message: "Something went wrong ✘",
        });
      }
    } else {
      return res.status(500).json({
        message: "Something went wrong ✘",
      });
    }
  });
};

const updateUser = (req, res) => {
  const { firstName, lastName, id } = req.body;

  User.findOne({ _id: id })
    .then((user) => {
      user.firstName = firstName;
      user.lastName = lastName;

      user
        .save()
        .then(() => {
          res.status(201).json({ user, message: "updated profile" });
        })
        .catch((err) =>
          res.status(500).json({ message: "something went wrong" })
        );
    })
    .catch((err) => res.status(500).json({ message: "something went wrong" }));
};

module.exports = { signup, signin, updateUser };
