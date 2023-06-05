const { Users } = require("../db/models");
const { Response, Error } = require("../helpers/response");
const bcrypt = require("bcryptjs");
const { getToken, verifyToken } = require("../helpers/jwt");

class UserController {
  static async registerUser(req, res, next) {
    try {
      // extract input from req.body
      const { email, password } = req.body;
      const checkEmail = await Users.findOne({
        where: { email: email },
      });
       // validate if email or username already exists
       if (checkEmail) {
        throw new Error(400, "Email already exists");
      }
      // hash password before storing to db
      const hashedPassword = await bcrypt.hash(password, 10);

      // create db
      const data = await Users.create({
        email: email,
        password: hashedPassword,
        isAdmin: false,
      });
      return new Response(res, 201, {
        email: email,
  
      });
    } catch (error) {
      next(error);
    }
  }
  static async loginUser(req, res, next) {
    try {
      // extract input data from req.body
      const { email, password } = req.body;
      const checkEmail = await Users.findOne({ where: { email: email } });
      // search and validate if the email is registered or not
      if (!checkEmail) {
        throw new Error(401, `Email ${email} is not registered yet`);
      }

      // check decrypted password is matched with from database
      const passwordLogin = await bcrypt.compare(password, checkEmail.password);
      if (!passwordLogin) {
        throw new Error(401, "Invalid email or password");
      }
      const payload = {
        id: checkEmail.id,
        email: checkEmail.email,
        isAdmin: checkEmail.isAdmin,
      };
      const token = getToken(payload);
      return new Response(res, 200, token);
    } catch (error) {
      next(error);
    }
  }
  static async deleteUser(req, res, next) {
    try {
        // extract data from req.params
        const id = req.query.id;
        const searchUser = await Users.findOne({
          where: { id: id },
        });
        // validate if the ID is match  with current data
        if (!searchUser) {
          throw new Error(400, `No user with ID ${id}`);
        }
        // validate if the id from token matched the req.params
        if (searchUser.id !== req.user.id) {
          throw new Error(401, "Unauthorized to make changes");
        }
        // delete user
        const deleteUser = await Users.destroy({
          where: { id: id },
        });
        return new Response(res, 200, "User deleted successfully");
      } catch (error) {
        next(error);
      }
  }
}

module.exports = UserController;
