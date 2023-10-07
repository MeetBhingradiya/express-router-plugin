import Router from 'express-router-plugin';
import {
    Config,
    app
} from './Config';

const AppRouter = new Router();

AppRouter.Init({
    ApplyDefaultRateLimit: false,
    inbuild_error_handler: true,
    GlobalRateLimit: {
        windowMs: 60 * 1000,
        max: 5,
        handler: (req, res, next) => {
            res.send({
                status: 0,
                Message: `[Global Preset] You Have Exceeded The Limit of Requests Per Minute. Please Try Again After 1 Minute.`,
                StatusCode: 429,
            })
        },
    },
});

AppRouter.CreateRoute({
    endpoint: "/get",

    method: "get",

    Middleware: [],

    controller: (req, res) => {
        res.send("Hello World");
    },
    LimitOptions: {
        ...Config.Presets._1Min
    }
    // LimitPreset: Config.Presets._1Min
});

AppRouter.Execute(app);

app.listen(3000, () => {
    console.log("Server Started at http://localhost:3000");
})

module.exports = app;