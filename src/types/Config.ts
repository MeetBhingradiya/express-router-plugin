import { RateLimitRequestHandler, RateLimit_Options_Optimised } from ".";

interface Config_Type {
    /**
     * + `use_inbuild_express_module_for_routing` is used to use the inbuild express module for routing you need to only listen to the port
     */
    // use_inbuild_express_module_for_routing?: boolean;

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
}

export {
    Config_Type
}