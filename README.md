# Express Router Plugin

Custom Express Router with Integrated Rate Limiting and Middlewares.

## Installation

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
import express from 'express';
import { Router } from 'express-router-plugin';

const app = express();
const AppRouter = new Router();

// ? Initialize the router with your preferred configurations
AppRouter.Init({
    // ? Enable Error Handler in Controllers default: false
    InbuildErrorHandler: true,

    // ? Enable Direct Express Router default: false
    useDirectExpress: true,

    // ? Enable Rate Limiting default: false
    ApplyDefaultRateLimit: true
})

// ? Create a new route with your preferred configurations
AppRoute.createRoute({
    // ? Endpoint is directly passed to express router
    endpoint: '/test',

    // ? Method currently supports get, post, put, delete only
    method: 'get',

    // ? Middlewares are passed as an array
    controller: (req, res) => {
        res.send({
            message: 'Hello World',
        });
    },

    // ? Rate Limiting Options are passed as an object to `express-rate-limit` package
    LimitOptions: {
        limit: 5,
        windowMs: 1000 * 60 * 60 * 24,
        message: 'You have reached your limit for today.',
        statusCode: 429,
    },
});

// ? Execute the router
AppRouter.Execute(app); // OR app.use(AppRouter.Execute());

// ? Start the express server
app.listen(8080);
```

## Documentation


## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you find any problems or have suggestions for improvements.

## License
This project is licensed under the `MIT` License - see the [LICENSE](./LICENSE) file for details.
