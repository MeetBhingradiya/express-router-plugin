import { app, Tests } from "./Config";
import Router from "express-router-plugin";

Tests.forEach((Test) => {
    const Name = Test.name;
    Test.name = new Router();
    const AppRouter: Router = Test.name;
    
    if (Test.Options?.Init) {
        AppRouter.Init(Test.Options.Init);
    }
    console.log(`[SM E-R-P] ${Name}`);

    if (Test.Options?.Routes) {
        Test.Options.Routes.forEach((Route) => {
            AppRouter.CreateRoute(Route);
            console.log(`[SM E-R-P] ${Name} - http://localhost:3000${Test.endpoint}${Route.endpoint}`)
        })
    }

    app.use(Test.endpoint, AppRouter.Execute());
})


app.listen(3000, () => {
    console.log("[SM E-R-P] [SERVER] http://localhost:3000");
})

module.exports = app;