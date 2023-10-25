import express from 'express';

import projectController from "../controllers/project";

const router: express.Router = express.Router();


router.route("/")
    .get(projectController.getAll)

router.route("/:projectId")
    .get(projectController.getById)

export default router;

