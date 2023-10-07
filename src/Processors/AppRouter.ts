import { Config_Type, CreateRoute_Type, RateLimit_Options_Optimised, Controller_Type } from "../types";
import { useController } from ".";
import { Router as _Route, Express } from "express";
import RateLimit, { RateLimitRequestHandler } from "express-rate-limit";

class AppRouter {
    private Router: _Route;

    // ? Config Options
    private Config: Config_Type = {
        inbuild_error_handler: true,
        ApplyDefaultRateLimit: false,
    }

    constructor() {
        this.Router = _Route();
    }

    private applyMiddleware(middleware: Controller_Type[]): Controller_Type[] {
        return middleware;
    }

    private applyRateLimit(limitOptions: RateLimit_Options_Optimised): RateLimitRequestHandler {
        return RateLimit(limitOptions);
    }

    /**
     * #### Init Function - Not Required
     * + This function is used to Made configurations to the AppRouter
     * + `Not Required` to use this function
     * @param Config Config_Type
     */
    public Init (Config: Config_Type): void {
        if (Config) {
            this.Config = {
                ...this.Config,
                ...Config
            }
        }
    }

    /**
     * #### CreateRoute Function - Not Required
     * + This function is used to create routes in the express app
     * + `Required` to use this function
     * @param CreateRoute_Type 
     * @returns 
     */
    public CreateRoute({
        endpoint,
        method,
        Middleware = [],
        controller,
        LimitOptions = {},
        LimitPreset
    }: CreateRoute_Type): void {
        const RateLimit_Instance = LimitPreset ? LimitPreset() : this.applyRateLimit(LimitOptions);
        const Middlewares = this.applyMiddleware(Middleware);
        const Controller = this.Config.inbuild_error_handler ? useController(controller) : controller;

        if (this.Config.ApplyDefaultRateLimit) {
            this.Router.use(RateLimit_Instance);

            this.Router[method](endpoint, ...Middlewares, Controller);
        } else {
            if(Object.keys(LimitOptions).length > 0 || LimitPreset) {
                this.Router.use(RateLimit_Instance);
            }

            this.Router[method](endpoint, ...Middlewares, Controller);
        }
    }

    /**
     * #### Execute Function - Required
     * + This function is used to execute the AppRouter in the express app otherwise will not work your created routes
     * + `Required` to use this function
     * @param app 
     * @returns 
     */
    public Execute(app?: Express): Express | _Route {
        return app ? app.use(this.Router) : this.Router;
    }
}

export {
    AppRouter
}