import { RateLimit_Options_Optimised, RateLimitRequestHandler, Controller_Type, Middleware_Type  } from ".";

type TimeString_Type = string | number

interface CreateRoute_Type {
    endpoint: string | Array<string>;
    method: "get" | "post" | "put" | "patch" | "delete" | "head" | "options"
    controller: Controller_Type;
    Middleware?: Middleware_Type[];
    LimitOptions?: RateLimit_Options_Optimised;
    LimitPreset?: RateLimitRequestHandler;
    Timeout?: TimeString_Type
}

export {
    CreateRoute_Type,
    TimeString_Type
}
