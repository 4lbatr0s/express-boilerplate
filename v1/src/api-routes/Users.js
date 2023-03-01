import express from 'express';
import schemas from "../validations/Users.js";
import validate from "../middlewares/validate.js";
import UsersController from "../controllers/Users.js";
import authenticate from "../middlewares/authenticate.js";
import idChecker from '../middlewares/idChecker.js';

const router = express.Router();

router.route("/").post(validate(schemas.createValidation), UsersController.create);
router.get("/",authenticate, UsersController.list);
router.route("/login").post(validate(schemas.loginValidation), UsersController.login);
router.route("/").patch(authenticate, validate(schemas.updateValidation), UsersController.update);
router.route("/projects").get(authenticate, UsersController.projectList);
router.route("/reset-password").post(validate(schemas.resetPasswordValidation), UsersController.resetPassword);
router.route("/change-password").post(authenticate, validate(schemas.changePasswordValidation), UsersController.changePassword);
router.route("/:id").delete(idChecker(),authenticate, UsersController.remove);
router.route("/update-profile-image").post(authenticate, UsersController.updateProfileImage);


export default router;