import { Request, Response, NextFunction } from 'express';

type Controller_Type = (req: Request, res: Response, next?: NextFunction) => void | unknown | Promise<void> | Promise<unknown>;
type Middleware_Type = (req: Request, res: Response, next: NextFunction) => void | unknown | Promise<void> | Promise<unknown>;

export {
    Controller_Type,
    Middleware_Type
}