module.exports = {
    apps: [
        {
            name: "app",
            script: "./src/app.ts",
            instances: 0,
            exec_mode: "cluster",
        },
    ],
};