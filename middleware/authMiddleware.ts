import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret';

export const authenticate = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader) { res.status(401).json({ message: 'No token provided' });
      return;}

    const token = authHeader.split(' ')[1];

    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      if (roles.length && !roles.includes(decoded.role)) {
        res.status(403).json({ message: 'Forbidden: Insufficient role' });
        return;
      }

      (req as any).user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid Token' });
    }
  };
};
