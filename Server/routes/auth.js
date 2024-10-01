var express = require("express");
var router = express.Router();
const MySql = require("../routes/utils/MySql");
const DButils = require("../routes/utils/DButils");
const bcrypt = require("bcrypt");

/**
 * Handles user registration.
 * @route POST /Register
 * @param {Object} req - The request object containing user details in the body.
 * @param {Object} res - The response object used to send a response.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - Returns a success message if the registration is successful.
 * @throws {Object} - Throws a 409 status error if the username is already taken.
 * @throws {Object} - Throws a 500 status error for internal server issues.
 */
router.post("/Register", async (req, res, next) => {
  try {
    let user_details = {
      user_name: req.body.user_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      country: req.body.country,
      password: req.body.password,
      email: req.body.email,
      profilePic: req.body.profilePic
    }
    let users = [];
    users = await DButils.execQuery("SELECT user_name from users");
    console.log(users.user_name)
    if (users.find((x) => x.user_name === user_details.user_name))
      throw { status: 409, message: "Username taken" };

    else{// add the new username
    let hash_password = bcrypt.hashSync(
      user_details.password,
      parseInt(process.env.bcrypt_saltRounds)
    );
    await DButils.execQuery(
      `INSERT INTO users VALUES ('${user_details.user_name}', '${user_details.first_name}', '${user_details.last_name}', '${user_details.country}', '${hash_password}', '${user_details.email}')`
    );
    res.status(201).send({ message: "user created", success: true });}
  } catch (error) {
    console.error("Registration error:", error);

    if (error.status === 409) {
      res.status(409).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Internal Server Error" });
    }
  
}});


/**
 * Handles user login.
 * @route POST /Login
 * @param {Object} req - The request object containing user credentials in the body.
 * @param {Object} res - The response object used to send a response.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - Returns a success message if login is successful.
 * @throws {Object} - Throws a 401 status error if the username or password is incorrect.
 */
router.post("/Login", async (req, res, next) => {
  try {
    // check that username exists
    const users = await DButils.execQuery("SELECT user_name FROM users");
    if (!users.find((x) => x.user_name === req.body.user_name))

      throw { status: 401, message: "Username incorrect"};

    // check that the password is correct
    const user = (
      await DButils.execQuery(
        `SELECT * FROM users WHERE user_name = '${req.body.user_name}'`
      )
    )[0];
    if (!bcrypt.compareSync(req.body.password, user.user_password)) {
      throw { status: 401, message: "Username or Password incorrect" };
    }
    // Set cookie
    req.session.user_id = user.user_name;
    // return cookie
    res.status(200).send({ message: "login succeeded", success: true });
  } catch (error) {
    next(error);
  }
});

/**
 * Handles user logout.
 * @route POST /Logout
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send a response.
 * @returns {Object} - Returns a success message if logout is successful.
 */
router.post("/Logout", function (req, res) {
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.send({ success: true, message: "logout succeeded" });
});

module.exports = router;