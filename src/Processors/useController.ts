import { Request, Response, NextFunction } from "express";
import { Controller_Type } from "../types";

function useController(Controller: Controller_Type): Controller_Type {
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

export {
    useController
}