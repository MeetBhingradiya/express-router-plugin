import Express from 'express';

// ? Import Router from express-router-plugin package
import Router, { Create_Limit_Preset } from 'express-router-plugin';
// ? or
// import { Router } from 'express-router-plugin';
// ? or
// import { AppRouter } from 'express-router-plugin';

// ? Limit Presets
const LimitPresets = {
    _15Min: Create_Limit_Preset({
        windowMs: 15 * 60 * 1000,
        max: 5 * 15,
        message: "Too many requests, please try again after 15 minutes"
    }),
    _1Min: Create_Limit_Preset({
        windowMs: 1 * 60 * 1000,
        max: 5,
        message: "Too many requests, please try again after 1 minute"
    }),
    _2Hour: Create_Limit_Preset({
        windowMs: 2 * 60 * 60 * 1000,
        max: 10,
        message: "Too many requests, please try again after 2 hours"
    }),
}

const app = Express();

/**
 * ? Create a new instance of AppRouter
 */
const AppRouter = new Router();

AppRouter.Init({
    // ? Apply Default RateLimit to all routes in the AppRouter only if you want default false
    ApplyDefaultRateLimit: false,

    // ? Apply Inbuild Error Handler to all routes in the AppRouter only if you want default true
    inbuild_error_handler: true
});

/**
 * ? Create a new route not RateLimite
 */
AppRouter.CreateRoute({
    // ? Endpoint of the route
    endpoint: "/",

    // ? Method of the route  ! Currently only supports get, post, put, delete
    method: "get",

    // ? Middleware of the route
    Middleware: [],

    // ? Controller of the route
    controller: (req, res) => {
        res.send("Hello World");
    }
    // ? LimitOptions of the route
    // LimitOptions: {},

    // ? LimitPreset of the route
    // LimitPreset: LimitPresets._1Min
});

/**
 * ? Execute the AppRouter
 */
AppRouter.Execute(app); // ? or app.use("/<Your Endpoint>" , AppRouter.Execute());

// ? Express Server Listen
app.listen(3000, () => {
    console.log("Server Started at http://localhost:3000");
})

module.exports = app;