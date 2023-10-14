import { RateLimit_Options_Optimised, RateLimitRequestHandler, Controller_Type, Middleware_Type  } from ".";

type TimeString_Type = string | number

interface CreateRoute_Type {
    endpoint: string | Array<string>;
    method: "get" | "post" | "put" | "delete";
    Middleware?: Middleware_Type[];
    controller: Controller_Type;
    LimitOptions?: RateLimit_Options_Optimised;
    LimitPreset?: RateLimitRequestHandler;
    
    /**
     * @deprecated Not Available on This Version Update to use this
     */
    TimeOut?: TimeString_Type
}

export {
    CreateRoute_Type,
    TimeString_Type
}
