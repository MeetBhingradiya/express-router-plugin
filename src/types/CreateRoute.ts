import { RateLimit_Options_Optimised, RateLimitRequestHandler, Controller_Type } from ".";

interface CreateRoute_Type {
    endpoint: string | Array<string>;
    method: "get" | "post" | "put" | "delete";
    Middleware?: Controller_Type[];
    controller: Controller_Type;
    LimitOptions?: RateLimit_Options_Optimised;
    LimitPreset?: RateLimitRequestHandler;
}

export {
    CreateRoute_Type
}
