import * as dotenv from "dotenv";
import express, { Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";
const cluster = require("cluster");
const totalCPUs = require("os").availableParallelism();

dotenv.config();
require("./data/db");

const EVENTS: { FINISH: string } = { FINISH: "finish" };

import { logRequest, logResponse } from "./middeleware/logger";
import routes from "./routes";


// get number of CPUs and lunch them
if (cluster.isPrimary) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker: any, code: number | null, signal: string | null) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });
}


// set up the express app
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    logRequest(req);
    res.on(EVENTS.FINISH, () => {
        logResponse(res);
    });
    next();
});

app.use("/api", function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.method, req.url);
    next();
});

// handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`uncaughtException error has occurred: ${err}`);
    process.exit(1);
});
// handle unhandled rejections
process.on("unhandledRejection", (err) => {
    console.log(`uncaughtRejection error has occurred: ${err}`);
    process.exit(1);
});

app.use("/api", routes);

export default app;