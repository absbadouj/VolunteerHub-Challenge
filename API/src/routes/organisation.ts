import express from 'express';
import organisationController from "../controllers/organisation";
import projectsController from "../controllers/project";

const router: express.Router = express.Router();


router.route("/")
    .get(organisationController.getAll)
    .post(organisationController.insert);

router.route("/:organisationId")
    .post(projectsController.insert)
    .put(organisationController.edit)
    .get(organisationController.getById)
    .delete(organisationController.deleteById);

router.route("/:organisationId/projects")
    .get(projectsController.getByOrganisations);

export default router;

