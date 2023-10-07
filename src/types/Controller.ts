import { Request, Response, NextFunction } from 'express';

type Controller_Type = (req: Request, res: Response, next?: NextFunction) => unknown | Promise<unknown>;

export {
    Controller_Type
}