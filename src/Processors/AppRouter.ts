import { Config_Type, CreateRoute_Type, RateLimit_Options_Optimised, Middleware_Type } from "../types";
import { useController } from ".";
import { Router as _Route, Express } from "express";
import RateLimit, { RateLimitRequestHandler } from "express-rate-limit";

class AppRouter {
    private Router: _Route;

    // ? Config Options
    private Config: Config_Type = {
        inbuild_error_handler: true,
        ApplyDefaultRateLimit: false,
        GlobalRateLimit: undefined,
        SafeMode: false,
        GlobalMiddleware: undefined,
    }

    constructor() {
        this.Router = _Route();
    }

    private applyMiddleware(middleware: Middleware_Type[]): Middleware_Type[] {
        return middleware;
    }

    private applyRateLimit(limitOptions: RateLimit_Options_Optimised): RateLimitRequestHandler {
        return RateLimit(limitOptions);
    }

    private applyGlobalMiddleware(): void {
        if (this.Config.GlobalMiddleware) {
            this.Router.use(this.applyMiddleware(this.Config.GlobalMiddleware));
        }
    }

    /**
     * #### Init Function - Not Required
     * + This function is used to Made configurations to the AppRouter
     * + `Not Required` to use this function
     * @param Config Config_Type
     */
    public Init(Config: Config_Type): void {
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
        const Apply_RateLimit_Instance = () => {
            if (LimitPreset) {
                this.Router.use(endpoint, LimitPreset);

                if (!this.Config.SafeMode) {
                    return;
                }
            }
            if (Object.keys(LimitOptions).length > 0) {
                this.Router.use(endpoint, this.applyRateLimit(LimitOptions));

                if (!this.Config.SafeMode) {
                    return;
                };
            }
            if (this.Config.GlobalRateLimit) {
                this.Router.use(this.applyRateLimit(this.Config.GlobalRateLimit));
                return;
            }
            if (this.Config.ApplyDefaultRateLimit && !this.Config.GlobalRateLimit && !(Object.keys(LimitOptions).length > 0) && !LimitPreset) {
                this.Router.use(RateLimit());
                return;
            }
        }

        this.applyGlobalMiddleware();
        Apply_RateLimit_Instance();
        const Middlewares = this.applyMiddleware(Middleware);
        const Controller = this.Config.inbuild_error_handler ? useController(controller) : controller;

        this.Router[method](endpoint, ...Middlewares, Controller);
    }

    /**
     * #### Execute Function - Required
     * + This function is used to execute the AppRouter in the express app otherwise will not work your created routes
     * + `Required` to use this function
     * @param app 
     * @returns 
     */
    public Execute(app?: Express, endpoint?: string): Express | _Route {
        if (endpoint) {
            return app ? app.use(endpoint, this.Router) : this.Router;
        } else {
            return app ? app.use(this.Router) : this.Router;
        }
    }
}

export {
    AppRouter
}