import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import serverConfig from "../config/serverConfig";

export default function authToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.includes("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return res.status(400).json({ success: false, message: "Token not found" });
  }
  try {
    const decoded = jwt.verify(
      token!,
      serverConfig.JWT_SECRET_KEY!
    ) as JwtPayload;
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid token" });
  }
}
