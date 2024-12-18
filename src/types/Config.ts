import { NextFunction, Request, Response } from "express";
import { Middleware_Type, RateLimit_Options_Optimised, TimeString_Type } from ".";

interface Config_Type {
    /**
     * + `inbuild_error_handler` is used to use the inbuild error handler for the controllers of the routes
     * +  default value is `true`
     * +  @deprecated use `ERRORHandlers` instead
     */
    inbuild_error_handler?: boolean;
    
    ERRORHandlers?: boolean;
    ERRORHandler?: (error: Error, req: Request, res: Response, next: NextFunction) => void;

    /**
     * + `apply_default_rate_limit` is used to apply rate limit on all the routes by default if not specified in the route
     * +  default value is `false`
     */
    ApplyDefaultRateLimit?: boolean;

    /**
     * + `GlobalRateLimit` is used to apply rate limit on all the routes by default if not specified in the route
     * +  default value is `undefined`
     * +  Limit Priority: `LimitOptions` > `LimitPreset` > `GlobalRateLimit` > `DefaultLimits`
     */
    GlobalRateLimit?: RateLimit_Options_Optimised | undefined;

    /**
     * + This will Change RateLimit Priority
     * + Limit Priority: 
     * + Timeout Priority:
     * + Middlewares Priority:
     * + default value is `false`
     * + @description This will Change Priority of RateLimit, Timeout, Middlewares
     */
    SafeMode?: boolean;

    /**
     * + `GlobalMiddleware` is used to apply middleware on all the routes by default if not specified in the route
     * + default value is `undefined`
     */
    GlobalMiddlewares?: Middleware_Type[]

    /**
     * + `GlobalTimeout` is used to apply timeout on all the routes by default if not specified in the route
     * + default value is `undefined`
     */
    GlobalTimeout?: TimeString_Type
}

export {
    Config_Type
}