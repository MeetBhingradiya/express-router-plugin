import express, {Request, Response, NextFunction} from "express";

const app = express();

const Config = {
    Presets: {
        _1Min: {
            windowMs: 60 * 1000,
            max: 9,
            handler: (req:Request, res:Response, next:NextFunction) => {
                res.send({
                    status: 0,
                    Message: `[Preset 1MIN] You Have Exceeded The Limit of Requests Per Minute. Please Try Again After 1 Minute.`,
                    StatusCode: 429,
                })
            },
        },
        _15Min: {
            windowMs: 15 * 60 * 1000,
            max: 5 * 15,
            handler: (req:Request, res:Response, next:NextFunction) => {
                res.send({
                    status: 0,
                    Message: `You Have Exceeded The Limit of Requests Per 15 Minutes. Please Try Again After 15 Minutes.`,
                    StatusCode: 429,
                })
            },
        },
        _1Hr: {
            windowMs: 60 * 60 * 1000,
            max: 5 * 60,
            handler: (req:Request, res:Response, next:NextFunction) => {
                res.send({
                    status: 0,
                    Message: `You Have Exceeded The Limit of Requests Per Hour. Please Try Again After 1 Hour.`,
                    StatusCode: 429,
                })
            },
        },
        _1Day: {
            windowMs: 24 * 60 * 60 * 1000,
            max: 5 * 60 * 24,
            handler: (req:Request, res:Response, next:NextFunction) => {
                res.send({
                    status: 0,
                    Message: `You Have Exceeded The Limit of Requests Per Day. Please Try Again After 1 Day.`,
                    StatusCode: 429,
                })
            },
        },
    }
}

export default Config;
export {
    Config,
    app
}