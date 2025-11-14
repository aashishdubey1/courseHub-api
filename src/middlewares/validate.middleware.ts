import type { NextFunction, Request, Response } from "express";
import type ParamsDictionary from "express";
import { ZodAny, ZodError, ZodType, ZodObject } from "zod";

export const validateBody =
  <T>(schema: ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedBody = schema.parse(req.body);
      console.log({ parsedBody });
      req.body = parsedBody;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid Inputs",
          errors: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
    }
  };

export const validateParams =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid Inputs",
          errors: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
    }
  };
