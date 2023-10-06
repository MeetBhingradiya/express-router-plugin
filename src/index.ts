import { Router as _Router, Request, Response, NextFunction, Express } from "express";
import RateLimit, { RateLimitRequestHandler, Options as RateLimit_Options } from "express-rate-limit";

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

function useController(Controller: Controller): Controller {
    return async function Temp(req: Request, res: Response, next?: NextFunction) {
        try {
            await Controller(req, res, next);
        } catch (error: any) {
            res.status(500).send({
                Status: 0,
                Message: "Internal Server Error",
                StatusCode: 500,
                NameofController: Controller?.name,
                Error: error
            })
        }
    }
}

interface RateLimit_Options_New {
    handler?: RateLimit_Options["handler"],
    windowMs?: RateLimit_Options["windowMs"],
    limit?: RateLimit_Options["limit"],
    keyGenerator?: RateLimit_Options["keyGenerator"],
    skip?: RateLimit_Options["skip"],
    skipSuccessfulRequests?: RateLimit_Options["skipSuccessfulRequests"],
    skipFailedRequests?: RateLimit_Options["skipFailedRequests"],
    message?: RateLimit_Options["message"],
    statusCode?: RateLimit_Options["statusCode"],
    /**
     * @deprecated
     */
    headers?: RateLimit_Options["headers"],
    /**
     * @deprecated
     */
    max?: RateLimit_Options["max"],
    requestWasSuccessful?: RateLimit_Options["requestWasSuccessful"],
    validate?: RateLimit_Options["validate"],
    store?: RateLimit_Options["store"],
    requestPropertyName?: RateLimit_Options["requestPropertyName"],
    standardHeaders?: RateLimit_Options["standardHeaders"],
    legacyHeaders?: RateLimit_Options["legacyHeaders"],
}

/**
 * #### Create RateLimit Preset for AppRouter or Other Manual RateLimit Usage
 * @param Config RateLimit_Options
 * @returns RateLimitRequestHandler
 */
function Create_Limit_Preset(Config: RateLimit_Options_New): RateLimitRequestHandler {
    return RateLimit(Config);
}

/**
 * #### Route with Integrated RateLimit and Middlewares Support
 * ```ts
 * const Router = new AppRouter();
 * ```
 */
class AppRouter {
    public router: _Router;

    // ? Config Options
    private useDirectExpress: boolean = false;
    private InbuildErrorHandler: boolean = false;
    private ApplyDefaultRateLimit: boolean = false;

    constructor() {
        this.router = _Router();
    }

    private applyMiddleware(middleware: Controller[]): Controller[] {
        return middleware;
    }

    private applyRateLimit(limitOptions: RateLimit_Options_New): RateLimitRequestHandler {
        return RateLimit(limitOptions);
    }

    Init(Config?: Init_Config): void {
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

    createRoute({
        endpoint,
        method,
        Middleware = [],
        controller,
        LimitOptions = {},
        LimitPreset,
    }: CreateRoute_Type): void {
        const limiter = LimitPreset ? LimitPreset() : this.applyRateLimit(LimitOptions);
        const middlewares = this.applyMiddleware(Middleware);
        const Controller = this.InbuildErrorHandler ? useController(controller) : controller;
        if(this.ApplyDefaultRateLimit) {
            this.router[method](endpoint, ...middlewares, limiter, Controller);
        } else {
            this.router[method](endpoint, ...middlewares, Controller);
        }
    }

    Execute(app?: Express): _Router {
        if (this.useDirectExpress) {
            if(app) {
                return app.use(this.router);
            } else {
                console.error("[Express-Router-Plugin] (ERROR) Express App is not defined !");
                return this.router;
            }
        } else {
            return this.router;
        }
    }
}

export {
    CreateRoute_Type,
    Create_Limit_Preset,
    useController,
    AppRouter as Router,
    AppRouter as AppRouter,
    Controller
};

export default AppRouter;