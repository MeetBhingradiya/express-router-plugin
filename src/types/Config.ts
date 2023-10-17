import { Middleware_Type, RateLimit_Options_Optimised, TimeString_Type } from ".";

interface Config_Type {
    /**
     * + `inbuild_error_handler` is used to use the inbuild error handler for the controllers of the routes
     * +  default value is `true`
     */
    inbuild_error_handler?: boolean;

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
     * + Limit Priority: `GlobalRateLimit` > `LimitPreset` > `LimitOptions` > `DefaultLimits`
     */
    SafeMode?: boolean;

    /**
     * + `GlobalTimeout` is used to apply timeout on all the routes by default if not specified in the route
     * + default value is `undefined`
     * + @deprecated Not Available on This Version Update to use this
     */
    GlobalTimeout?: TimeString_Type

    /**
     * + `GlobalMiddleware` is used to apply middleware on all the routes by default if not specified in the route
     * + default value is `undefined`
     * + @deprecated Not Available on This Version Update to use this
     */
    GlobalMiddleware?: Middleware_Type[]
}

export {
    Config_Type
}