import type { NextFunction, Request, Response } from "express";

export const authorize =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!allowedRoles.includes(role!))
      return res.status(403).json({ message: "Access Denied" });

    next();
  };
