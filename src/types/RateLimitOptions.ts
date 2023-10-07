import { Options as RateLimit_Options, RateLimitRequestHandler } from "express-rate-limit"

// ? Options Optimised (Version 7.1.0) [07/10/2023 01:19 PM IST]
interface RateLimit_Options_Optimised {
    handler?: RateLimit_Options["handler"]
    windowMs?: RateLimit_Options["windowMs"]
    limit?: RateLimit_Options["limit"]
    keyGenerator?: RateLimit_Options["keyGenerator"]
    skip?: RateLimit_Options["skip"]
    skipSuccessfulRequests?: RateLimit_Options["skipSuccessfulRequests"]
    skipFailedRequests?: RateLimit_Options["skipFailedRequests"]
    message?: RateLimit_Options["message"]
    statusCode?: RateLimit_Options["statusCode"]
    /**
     * @deprecated
     */
    headers?: RateLimit_Options["headers"]
    /**
     * @deprecated
     */
    max?: RateLimit_Options["max"]
    requestWasSuccessful?: RateLimit_Options["requestWasSuccessful"]
    validate?: RateLimit_Options["validate"]
    store?: RateLimit_Options["store"]
    requestPropertyName?: RateLimit_Options["requestPropertyName"]
    standardHeaders?: RateLimit_Options["standardHeaders"]
    legacyHeaders?: RateLimit_Options["legacyHeaders"]
}

export {
    RateLimit_Options_Optimised,
    RateLimitRequestHandler
}