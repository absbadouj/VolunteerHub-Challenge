import mongoose, { ConnectOptions } from "mongoose";
import EVENTS from "../enums/events";
import LOG_MESSAGE from "../enums/logMessage";

const db: mongoose.Connection = mongoose.connection;

require("../models")

mongoose.connect(process.env.MONGO_DB_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions)
    .then(() => console.log(LOG_MESSAGE.SERVER_CONNECTED))
    .catch((err: mongoose.Error) => console.log(LOG_MESSAGE.SERVER_NOT_CONNECTED, err));

db.on(EVENTS.CONNECTED, () => console.log(LOG_MESSAGE.MONGOOSE_CONNECTED + process.env.DB_NAME))
db.on(EVENTS.DISCONNECTED, () => console.log(LOG_MESSAGE.MONGOOSE_DISCONNECTED))
db.on(EVENTS.ERROR, (err: mongoose.Error) => console.log(LOG_MESSAGE.MONGOOSE_ERROR + err))

process.on(EVENTS.SIGINT, () => {
    mongoose.connection.close().then(() => {
        console.log(LOG_MESSAGE.CONNECTION_CLOSED);
        process.exit(0);
    })
})

process.on(EVENTS.SIGTERM, () => {
    mongoose.connection.close()
        .then(() => {
            console.log(LOG_MESSAGE.CONNECTION_CLOSED);
            process.exit(0);
        })
})


/* This code works fine on Windows but causes an infinite loop on macOS  */

// process.on(EVENTS.SIGUSR2, () => {
//     mongoose.connection.close()
//         .then(() => {
//             console.log(LOG_MESSAGE.CONNECTION_CLOSED);
//             process.kill(process.pid, "SIGUSR2");
//         })
// })

export default db;