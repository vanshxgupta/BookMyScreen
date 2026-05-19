
// Request validation is used to ensure that incoming client data follows the expected schema before reaching the database.

import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
    // Update req.body with validated and transformed safe data
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      next(error); // global error handler takes care
    }
  };