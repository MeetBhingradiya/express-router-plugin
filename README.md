# Express Router Plugin

Custom Express Router with Integrated Rate Limiting and Presets.

## Table of Contents
+ [Documentation](#documentation)
+ [New Documentation Soon!](https://meetbhingradiya.notion.site/ec5b42bc7d2749a0a5d7bb6d4a8cc609?v=f19bf64528ee47cfb87e3b49f819d51c&pvs=4)

## Features
+ Integrated Rate Limiting
+ Integrated Error Handler
+ Oranized Routes
+ Easy to use

## Installation

Run the following command to install the package:

```bash
yarn add express-router-plugin
```
OR 
```bash
npm install express-router-plugin
```
OR

```bash
pnpm add express-router-plugin
```
OR
```bash
bun add express-router-plugin
```

## Usage

```ts
import Express from 'express';

// ? Import Router from express-router-plugin package
import Router from 'express-router-plugin';
// ? or
// import { Router } from 'express-router-plugin';
// ? or
// import { AppRouter } from 'express-router-plugin';

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
```

## Documentation

>## Priorities Limit Configs
> + `LimitOptions` > `LimitPreset` > `GlobalRateLimit` > `DefaultLimits` > `No RateLimit`

### AppRouter.Init()
+ `ApplyDefaultRateLimit` - Apply Default RateLimit that set by `express-rate-limit` package to all routes in the AppRouter only if you want default false
+ `inbuild_error_handler` - Apply Inbuild Error Handler to all routes in the AppRouter only if you want default true

### AppRouter.CreateRoute()
+ `endpoint` - Endpoint of the route
+ `method` - Method of the route  ! Currently only supports get, post, put, delete
+ `Middleware` - Add Middlewares to the route
+ `controller` - Controller of the route
+ `LimitOptions` - LimitOptions that is directly passed to `express-rate-limit` package
+ `LimitPreset` - used to use pre-made presets of RateLimit that is created from `Create_Limit_Preset` function

```ts
import Express from 'express';
import Router from 'express-router-plugin';

const app = Express();
const AppRouter = new Router();

// ...Configs

AppRouter.CreateRoute({
    endpoint: "/",
    method: "get",
    Middleware: [],
    controller: (req, res) => {
        res.send("Hello World");
    }
    // LimitOptions: {},
    // LimitPreset: LimitPresets._1Min
});

// ...More Routes
```


### AppRouter.Execute()
+ `app` - Express App Instance

```ts
import Express from 'express';
import Router from 'express-router-plugin';

const app = Express();
const AppRouter = new Router();

// ...Routers and Configs

// ! Only one time use in the whole project other wise RateLimit conflicts occurs in the app
AppRouter.Execute(app);

// ? OR

// ! Recommended to use this method to avoid RateLimit Conflicts
app.use("/<Your Endpoint>" , AppRouter.Execute());

// ...Express Server Listen
```

### Create_Limit_Preset()
+ This function is used to create presets of RateLimit that is exported from `express-rate-limit` package
+ please refer to [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) for more details

```ts
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
```

+ Upper Presets are Directly used in `AppRouter.CreateRoute()` function

```ts
AppRouter.CreateRoute({
    endpoint: "/",
    method: "get",
    Middleware: [],
    controller: (req, res) => {
        res.send("Hello World");
    }
    LimitPreset: LimitPresets._1Min
});
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you find any problems or have suggestions for improvements.

## License
This project is licensed under the `MIT` License - see the [LICENSE](./License) file for details.
