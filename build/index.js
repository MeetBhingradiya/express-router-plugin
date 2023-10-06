"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = exports.Router = exports.useController = exports.Create_Limit_Preset = void 0;
const express_1 = require("express");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
function useController(Controller) {
    return async function Temp(req, res, next) {
        try {
            await Controller(req, res, next);
        }
        catch (error) {
            res.status(500).send({
                Status: 0,
                Message: "Internal Server Error",
                StatusCode: 500,
                NameofController: Controller?.name,
                Error: error
            });
        }
    };
}
exports.useController = useController;
/**
 * #### Create RateLimit Preset for AppRouter or Other Manual RateLimit Usage
 * @param Config RateLimit_Options
 * @returns RateLimitRequestHandler
 */
function Create_Limit_Preset(Config) {
    return (0, express_rate_limit_1.default)(Config);
}
exports.Create_Limit_Preset = Create_Limit_Preset;
/**
 * #### Route with Integrated RateLimit and Middlewares Support
 * ```ts
 * const Router = new AppRouter();
 * ```
 */
class AppRouter {
    router;
    // ? Config Options
    useDirectExpress = false;
    InbuildErrorHandler = false;
    ApplyDefaultRateLimit = false;
    constructor() {
        this.router = (0, express_1.Router)();
    }
    applyMiddleware(middleware) {
        return middleware;
    }
    applyRateLimit(limitOptions) {
        return (0, express_rate_limit_1.default)(limitOptions);
    }
    Init(Config) {
        if (Config) {
            if (Config.useDirectExpress) {
                this.useDirectExpress = Config.useDirectExpress;
            }
            if (Config.ApplyDefaultRateLimit) {
                this.ApplyDefaultRateLimit = Config.ApplyDefaultRateLimit;
            }
            if (Config.InbuildErrorHandler) {
                this.InbuildErrorHandler = Config.InbuildErrorHandler;
            }
        }
    }
    createRoute({ endpoint, method, Middleware = [], controller, LimitOptions = {}, LimitPreset, }) {
        const limiter = LimitPreset ? LimitPreset() : this.applyRateLimit(LimitOptions);
        const middlewares = this.applyMiddleware(Middleware);
        const Controller = this.InbuildErrorHandler ? useController(controller) : controller;
        if (this.ApplyDefaultRateLimit) {
            this.router[method](endpoint, ...middlewares, limiter, Controller);
        }
        else {
            this.router[method](endpoint, ...middlewares, Controller);
        }
    }
    Execute(app) {
        if (this.useDirectExpress) {
            if (app) {
                return app.use(this.router);
            }
            else {
                console.error("[Express-Router-Plugin] (ERROR) Express App is not defined !");
                return this.router;
            }
        }
        else {
            return this.router;
        }
    }
}
exports.Router = AppRouter;
exports.AppRouter = AppRouter;
exports.default = AppRouter;
