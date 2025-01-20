import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
   // Get the token from the Authorization header
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer <token>
 
   if (!token) {
     return res.status(401).json({ message: 'Access token is missing or invalid' });
   }
 
   try {
     // Verify the token
     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
     // Add user data to the request object
     req.user = decoded; 
     next(); 
     return;
   } catch (error) {
     return res.status(403).json({ message: 'Invalid or expired token' });
   }
};
