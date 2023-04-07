const UserModel = require("../../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
 
class Auth {
  static async Registeration(req, res) {
    try {
      const UserExist = await UserModel.findOne({ email: req.body.email });

      if (UserExist) {
        throw new Error("User already exists");
      }
      const CreatePasswwordSalt = bcrypt.genSaltSync(10);
      const CreateHashedPassword = bcrypt.hashSync(
        req.body.password,
        CreatePasswwordSalt
      );
      const CreateNewUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: CreateHashedPassword,
      });
      await CreateNewUser.save();
      res.send({
        success: true,
        message: "User Account Created successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
  static async Login(req, res) {
    try {
      const User = await UserModel.findOne({ email: req.body.email });
      if (!User) {
        throw new Error("User not exists");
      }
       if (!User.status === "active") {
         throw new Error(
           `This Account is ${User.status.toUpperCase()}, Please Contact the administrator`
         );
       }
      const CheckPasswordValidOrNot = await bcrypt.compare(
        req.body.password,
        User.password
      );
      if (!CheckPasswordValidOrNot) throw new Error("Incorrect Password");
      //create new toke and assigning it to the user
      const JWTToken = jwt.sign({ _id: User._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      res.send({
        success: true,
        data: JWTToken,
        message: "Login Success",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }

  static async  GetCurrentUser(req, res) {
    try {
      const user = await UserModel.findById(req.body.userId);
      const { password, ...rest } = user;
      res.send({
        success: true,
        message: "User Fetched",
        data: rest,
      });
    } catch (error) {}
  }
  static async AllUsers(req, res) {
    try {
      const data = await UserModel.find();
      res.send({
        success: true,
        message: "All User Fetched",
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async UpdateStatusOfUsers(req, res) {
    try {
      await UserModel.findByIdAndUpdate(req.params.userId, {
        status: req.body.status,
      });
      res.send({
        success: true,
        message: "Status Updated of " + UserModel.name + " to " + req.body.status.toUpperCase(),
        
      });
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = Auth;
