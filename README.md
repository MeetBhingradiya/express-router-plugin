# Express Router Plugin
### Latest Version : 2.4.0 🛹 [![npm version](https://badge.fury.io/js/express-router-plugin.svg)](https://badge.fury.io/js/express-router-plugin)

 A custom Express Router that integrates `seamlessly` with rate limiting and middlewares. This plugin simplifies the process of creating `organized routes` in your Express.js applications. It also provides `built-in error handling` for route controllers and `integrated rate limiting` for enhanced security. The Express Router Plugin is `easy to use` and can be integrated into existing Express applications with minimal effort.

## Table of Contents
+ [Features](#features)
+ [Installation](#installation)
+ [Usage](#usage)
+ [Priorities Limit Configs](#priorities-limit-configs)
+ [Documentation](#documentation)
+ [Advanced Docs](https://meetbhingradiya.notion.site/ec5b42bc7d2749a0a5d7bb6d4a8cc609?v=f19bf64528ee47cfb87e3b49f819d51c&pvs=4)
+ [Contributing](#contributing)
+ [License](#license)

## Features
+ **Integrated Rate Limiting:** Set rate limits for your routes effortlessly.
+ **Integrated Error Handler:** Built-in error handling for route controllers.
+ **Organized Routes:** Maintain clean and organized route structures.
+ **SafeMode:** Configure global rate limits for enhanced security.
+ **Easy to Use:** Simple integration into existing Express applications.

## Installation

To install the Express Router Plugin, use one of the following package managers:

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
const Express = require('express');
const { Router } = require('express-router-plugin');

const app = Express();
const AppRouter = new Router();

// Initialize AppRouter configurations (optional)
AppRouter.Init({
    
    // Apply Default RateLimit that set by express-rate-limit package to all routes in the AppRouter only if you want default is false
    ApplyDefaultRateLimit: false,

    // Apply Inbuild Error Handler to all routes in the AppRouter only if you want default is true
    inbuild_error_handler: true,

    // Default RateLimit that is directly passed to express-rate-limit package
    GlobalRateLimit: {
        // windowMs: 15 * 60 * 1000,
        // max: 100,
        // message: "Too many requests, please try again after 15 minutes"
        // ... other options from express-rate-limit
    },

    // This is change priority of RateLimit Configs so GlobalRateLimit is top priority and LimitOptions is bottom priority default LimitOptions is top priority and GlobalRateLimit is bottom priority
    SafeMode: true,

    // Global Middlewares that is applied to all routes in the AppRouter
    GlobalMiddlewares: [
        // ... Global Middlewares
    ],
    
    // Soon !  Not Added Yet 
    GlobalTimeout: 10000,
    ApplyDefaultTimeout: false, // ? Default Timeout is 10000ms or 10s
});

// Create routes
AppRouter.CreateRoute({
    endpoint: "/",
    method: "get",
    controller: (req, res) => {
        res.send("Hello World");
    }
    // Middleware: [
    //  Middleware1,
    // ],
    // LimitOptions: {},
    // LimitPreset: LimitPresets._1Min
});

// Execute AppRouter
AppRouter.Execute(app);

// Express Server Listen
app.listen(3000, () => {
    console.log("Server Started at http://localhost:3000");
});

module.exports = app;
```
## Priorities Limit Configs
> **`LimitPreset` > `LimitOptions` > `GlobalRateLimit` > `DefaultLimits` > `No RateLimit`**

1. **`LimitPreset`** - Rate limit presets created with `Create_Limit_Preset` function have the `highest` priority. If a route specifies a LimitPreset, it will be used as the rate limit configuration for that route.

2. **`LimitOptions`** - Rate limit options specified directly in the route using LimitOptions take the `second-highest` priority. These options are specific to the individual route and override any global rate limit settings.

3. **`GlobalRateLimit`**: Global rate limit configurations set during the initialization of AppRouter come next in priority. These configurations apply to all routes unless overridden by specific route settings.

4. **DefaultLimits:** If no specific rate limit configurations are provided for a route, and no global or route-specific limits are set, the route will inherit the default rate limits. These defaults are used when no other rate limit options are specified. Init Option Called `ApplyDefaultRateLimit` is used to apply default rate limit to all routes in the AppRouter.

5. **No Rate Limit:** If no rate limit options are provided at any level, the route operates without any rate limits. It has no defined restrictions on request rates.

By following this order of priority, you can effectively tailor the rate limiting behavior for your routes in your Express.js application.

## Documentation

### **`AppRouter.Init()`**
+ `ApplyDefaultRateLimit` - (boolean, default: **false**): Apply a default rate limit to all routes in the AppRouter. If set to true, the default rate limit will be applied to all routes unless overridden by a specific route setting.
+ `inbuild_error_handler` - (boolean, default: **true**): Apply the built-in error handler to all routes in the AppRouter. If set to true, the built-in error handler will be applied to all routes unless overridden by a specific route setting.
+ `GlobalRateLimit` - (RateLimitOptions, default: **undefined**): Set a global rate limit for all routes in the AppRouter. If set, this rate limit will be applied to all routes unless overridden by a specific route setting.
+ `SafeMode` - (boolean, default: **true**): Set the priority of rate limit configurations. If set to **true**, the priority order will be: `GlobalRateLimit > LimitPreset > LimitOptions > DefaultLimits > No RateLimit`. [Learn More](#priorities-limit-configs)

Example:

```ts
const Express = require('express');
const { Router } = require('express-router-plugin');

const app = Express();
const AppRouter = new Router();

// Initialize AppRouter configurations
AppRouter.Init({
    ApplyDefaultRateLimit: false,
    inbuild_error_handler: true,
    GlobalRateLimit: {
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: "Too many requests, please try again after 15 minutes"
    },
    SafeMode: true
    GlobalMiddlewares: [
        Middleware1,
        Middleware2,
        // ... Global Middlewares
    ],
});

// ...Create Routes
```

### **`AppRouter.CreateRoute()`**
The CreateRoute function is used to create routes in the AppRouter. It takes a single parameter, which is an object containing the route configuration. The following properties are supported:

+ **`endpoint`** - (string, required): The endpoint at which the route should be created. This is the same as the first parameter of the Express app's `app.METHOD()` functions.
+ **`method`** - (string, required): The HTTP method for the route. This is the same as the second parameter of the Express app's `app.METHOD()` functions.
+ **`Middleware`** - (array of functions, default: []): Array of middlewares to be applied to the route.
+ **`controller`** - (function, required): The controller function for the route. This is the same as the fourth parameter of the Express app's `app.METHOD()` functions.
+ **`LimitOptions`** - (object, default: undefined): Limit options for rate limiting specific to this route. These options override any global rate limit settings if `Safemode` is set to true.
+ **`LimitPreset`** -  (function, default: undefined): Pre-made rate limit preset function to be used for this route. These presets override any global rate limit settings if `Safemode` is set to true.

Example:

```ts
AppRouter.CreateRoute({
    endpoint: "/",
    method: "get",
    controller: (req, res) => {
        res.send("Hello World");
    }
    // Middleware: [
    //  Middleware1,
    // ],
    // LimitOptions: {},
    // LimitPreset: LimitPresets._1Min
});
```

### **`AppRouter.Execute(app, endpoint)`**
The Execute function integrates the AppRouter with the Express app as middleware. It must be called after all routes have been created and configured. The function takes two parameters:
+ **`app`** - (Express app instance, required): The Express app to which the AppRouter should be integrated.
+ **`endpoint`** - (string, optional): The endpoint at which the AppRouter should be mounted. If no endpoint is provided, the AppRouter will be mounted at the root of the Express app.

Example:

```ts
const Express = require('express');
const { Router } = require('express-router-plugin');

const app = Express();
const AppRouter = new Router();

// ... Initialize AppRouter and create routes

// Execute AppRouter
AppRouter.Execute(app); // or app.use(AppRouter.Execute());
// OR
AppRouter.Execute(app, "/api"); // or app.use("/api", AppRouter.Execute());

app.listen(3000, () => {
    console.log("Server Started at http://localhost:3000");
});

module.exports = app;
```

### **`Create_Limit_Preset()`**
+ We Used `express-rate-limit` : Version `7.1.0` `Last Updated 17-10-23`
+ This function is used to create presets of RateLimit that is exported from `express-rate-limit` package
+ please refer to `express-rate-limit` package [Learn more](https://www.npmjs.com/package/express-rate-limit)

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
    controller: (req, res) => {
        res.send("Hello World");
    }
    LimitPreset: LimitPresets._1Min
});
```

## Contributing

Contributions are welcome! If you encounter issues or have suggestions, please submit a pull request or open an issue.

## License
This project is licensed under the `MIT` License - see the [LICENSE](./License) file for details.

2023 © [TEAMSM](https://teamsm.vercel.app/)