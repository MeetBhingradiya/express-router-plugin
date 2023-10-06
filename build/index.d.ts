import { Router as _Router, Request, Response, NextFunction, Express } from "express";
import { RateLimitRequestHandler, Options as RateLimit_Options } from "express-rate-limit";
type Controller = (req: Request, res: Response, next?: NextFunction) => void | Promise<void>;
interface CreateRoute_Type {
    endpoint: string | Array<string>;
    method: "get" | "post" | "put" | "delete";
    Middleware?: Controller[];
    controller: Controller;
    LimitOptions?: RateLimit_Options_New;
    LimitPreset?: () => RateLimitRequestHandler;
}
interface Init_Config {
    /**
     * + `useDirectExpress` is used to directly use the express app instead executing the router manually
     */
    useDirectExpress?: boolean;
    /**
     * + `InbuildErrorHandler` is a used for handling errors in the controller so server doesn't crash
     */
    InbuildErrorHandler?: boolean;
    /**
     * + `ApplyDefaultRateLimit` is used to apply rate limit on all the routes by default if not specified in the route
     */
    ApplyDefaultRateLimit?: boolean;
}
declare function useController(Controller: Controller): Controller;
interface RateLimit_Options_New {
    handler?: RateLimit_Options["handler"];
    windowMs?: RateLimit_Options["windowMs"];
    limit?: RateLimit_Options["limit"];
    keyGenerator?: RateLimit_Options["keyGenerator"];
    skip?: RateLimit_Options["skip"];
    skipSuccessfulRequests?: RateLimit_Options["skipSuccessfulRequests"];
    skipFailedRequests?: RateLimit_Options["skipFailedRequests"];
    message?: RateLimit_Options["message"];
    statusCode?: RateLimit_Options["statusCode"];
    /**
     * @deprecated
     */
    headers?: RateLimit_Options["headers"];
    /**
     * @deprecated
     */
    max?: RateLimit_Options["max"];
    requestWasSuccessful?: RateLimit_Options["requestWasSuccessful"];
    validate?: RateLimit_Options["validate"];
    store?: RateLimit_Options["store"];
    requestPropertyName?: RateLimit_Options["requestPropertyName"];
    standardHeaders?: RateLimit_Options["standardHeaders"];
    legacyHeaders?: RateLimit_Options["legacyHeaders"];
}
/**
 * #### Create RateLimit Preset for AppRouter or Other Manual RateLimit Usage
 * @param Config RateLimit_Options
 * @returns RateLimitRequestHandler
 */
declare function Create_Limit_Preset(Config: RateLimit_Options_New): RateLimitRequestHandler;
/**
 * #### Route with Integrated RateLimit and Middlewares Support
 * ```ts
 * const Router = new AppRouter();
 * ```
 */
declare class AppRouter {
    router: _Router;
    private useDirectExpress;
    private InbuildErrorHandler;
    private ApplyDefaultRateLimit;
    constructor();
    private applyMiddleware;
    private applyRateLimit;
    Init(Config?: Init_Config): void;
    createRoute({ endpoint, method, Middleware, controller, LimitOptions, LimitPreset, }: CreateRoute_Type): void;
    Execute(app?: Express): _Router;
}
export { CreateRoute_Type, Create_Limit_Preset, useController, AppRouter as Router, AppRouter as AppRouter, Controller };
export default AppRouter;
