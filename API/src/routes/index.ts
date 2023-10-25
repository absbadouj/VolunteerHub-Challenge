import express from 'express';

import organisationRouter from './organisation';
import projectRouter from './project';
import userRouter from './user';

const router: express.Router = express.Router();

router.use("/organisations", organisationRouter);
router.use("/projects", projectRouter);
router.use("/users", userRouter);


export default router;
