import { Request, Response, NextFunction } from 'express';

type Conntroller_Type = (req: Request, res: Response, next?: NextFunction) => unknown | Promise<unknown>;

export {
    Conntroller_Type
}