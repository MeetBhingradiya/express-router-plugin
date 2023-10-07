import express from 'express';
import { Router } from 'express-router-plugin';

const App = express();
const AppRouter = new Router();

AppRouter.Init({
    InbuildErrorHandler: true
})

AppRouter.createRoute({
    endpoint: '/',
    method: 'get',
    controller: (req, res) => {
        res.send('Hello World!');
    },
    LimitOptions: {
        limit: 7,
        windowMs: 1000 * 15,
    }
});

App.use(AppRouter.Execute());

App.listen(3000, () => {
    console.log('Server is listening on port 3000!');
});

module.exports = App;