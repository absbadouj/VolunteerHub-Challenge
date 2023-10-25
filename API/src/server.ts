import app from "./app";

const LOG_MESSAGE: { SERVER_STARTED: string } = { SERVER_STARTED: "Server Started at:" };

app.listen(process.env.PORT || 3000, () => {
    const url = 'http://localhost:' + process.env.PORT;
    console.log(`${LOG_MESSAGE.SERVER_STARTED} ${url}`);
});