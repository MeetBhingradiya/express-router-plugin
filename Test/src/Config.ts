import express, { Request, Response, NextFunction } from "express";
import AppRouter, { CreateRoute_Type, Config_Type, Create_Limit_Preset } from "express-router-plugin";
const app = express();

interface Test_Type {
    name: string | AppRouter
    description: Array<string> | string
    URL?: string
    endpoint: string
    Options?: {
        Init?: Config_Type
        Routes?: Array<CreateRoute_Type>
    }
}

const Tests: Array<Test_Type> = [
    {
        name: "Basic Router",
        endpoint: "/Test1",
        description: [
            "Basic Router",
        ],
        Options: {
            Routes: [
                {
                    endpoint: "/",
                    method: "get",
                    controller: (req: Request, res: Response) => {
                        res.send({
                            Status: 1,
                            Message: "Test1",
                            StatusCode: 200
                        })
                    },
                }
            ]
        }
    },
    {
        name: "Anti ERROR Router",
        endpoint: "/Test2",
        description: [
            "ERROR Boundaries in Controller",
        ],
        Options: {
            Init: {
                inbuild_error_handler: true
            },
            Routes: [
                {
                    endpoint: "/",
                    method: "get",
                    controller: (req: Request, res: Response) => {
                        throw new Error("Test2");
                    },
                }
            ]
        }
    },
    {
        name: "Middleware Router",
        endpoint: "/Test3",
        description: [
            "Middleware Router",
        ],
        Options: {
            Routes: [
                {
                    endpoint: "/",
                    method: "get",
                    Middleware: [
                        (req: Request, res: Response, next: NextFunction) => {
                            console.log("[Log] Middleware 1 from Test3");
                            next();

                            return;
                        },
                    ],
                    controller: (req: Request, res: Response) => {
                        res.send({
                            Status: 1,
                            Message: "Test3",
                            StatusCode: 200
                        })
                    },
                }
            ]
        }
    },
    {
        name: "Global RateLimit Router",
        endpoint: "/Test4",
        description: [
            "RateLimit Router",
            "Global RateLimit",
        ],
        Options: {
            Init: {
                GlobalRateLimit: {
                    windowMs: 5000,
                    max: 1,
                    handler: (req: Request, res: Response) => {
                        res.send({
                            Status: 0,
                            Message: "Too Many Requests",
                            StatusCode: 429
                        })
                    }
                }
            },
            Routes: [
                {
                    endpoint: "/",
                    method: "get",
                    controller: (req: Request, res: Response) => {
                        res.send({
                            Status: 1,
                            Message: "Test4",
                            StatusCode: 200
                        })
                    },
                }
            ]
        }
    },
    {
        name: "RateLimit Route",
        endpoint: "/Test5",
        description: [
            "RateLimit Router",
            "Route RateLimit",
        ],
        Options: {
            Routes: [
                {
                    endpoint: "/",
                    method: "get",
                    LimitOptions: {
                        windowMs: 5000,
                        max: 1,
                        handler: (req: Request, res: Response) => {
                            res.send({
                                Status: 0,
                                Message: "Too Many Requests",
                                StatusCode: 429
                            })
                        }
                    },
                    controller: (req: Request, res: Response) => {
                        res.send({
                            Status: 1,
                            Message: "Test5",
                            StatusCode: 200
                        })
                    },
                }
            ]
        }
    },
    {
        name: "RateLimit Preset",
        endpoint: "/Test6",
        description: [
            "RateLimit Router",
            "Preset RateLimit",
        ],
        Options: {
            Routes: [
                {
                    endpoint: "/",
                    method: "get",
                    LimitPreset: Create_Limit_Preset({
                        windowMs: 5000,
                        max: 1,
                        handler: (req: Request, res: Response) => {
                            res.send({
                                Status: 0,
                                Message: "Too Many Requests",
                                StatusCode: 429
                            })
                        }
                    }),
                    controller: (req: Request, res: Response) => {
                        res.send({
                            Status: 1,
                            Message: "Test6",
                            StatusCode: 200
                        })
                    },
                }
            ]
        }
    },
    {
        name: "Global Middleware Router",
        endpoint: "/Test7",
        description: [
            "Middleware Router",
            "Global Middleware",
        ],
        Options: {
            Init: {
                GlobalMiddleware: [
                    (req: Request, res: Response, next: NextFunction) => {
                        console.log("[Log] Middleware 1 from Test7");
                        next();

                        return;
                    },
                ]
            },
            Routes: [
                {
                    endpoint: "/",
                    method: "get",
                    controller: (req: Request, res: Response) => {
                        res.send({
                            Status: 1,
                            Message: "Test7",
                            StatusCode: 200
                        })
                    },
                }
            ]
        }
    }
]



export {
    app,
    Tests
}