import express from 'express';

import usersController from "../controllers/user";

const router: express.Router = express.Router();

router.route("/")
    .get(usersController.getAll);

router.route("/register")
    .post(usersController.addOne);

router.route("/login")
    .post(usersController.login);

router.route("/:email")
    .get(usersController.getOne);



export default router;