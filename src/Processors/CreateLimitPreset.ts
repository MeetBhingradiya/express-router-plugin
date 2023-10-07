import RateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import { RateLimit_Options_Optimised } from "../types"

function Create_Limit_Preset(Config: RateLimit_Options_Optimised): RateLimitRequestHandler {
    return RateLimit(Config);
}

export {
    Create_Limit_Preset
}