import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  userId?: number;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const userIdHeader = req.header("x-user-id");

  if (!userIdHeader) {
    return res.status(401).json({ message: "Missing x-user-id header" });
  }

  const userId = Number(userIdHeader);
  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid x-user-id header" });
  }

  req.userId = userId;
  next();
};