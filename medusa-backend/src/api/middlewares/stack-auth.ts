import { Request, Response, NextFunction } from 'express'

/**
 * Middleware to extract Stack Auth user context from headers
 * Attaches user info to request for use in route handlers
 */
export function stackAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const stackUserId = req.headers['x-stack-user-id'] as string
  const userEmail = req.headers['x-user-email'] as string
  
  if (stackUserId) {
    // Attach Stack Auth user context to request
    req.user = {
      stackId: stackUserId,
      email: userEmail,
    }
  }
  
  next()
}

/**
 * Middleware to require authentication
 */
export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user?.stackId) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required'
    })
  }
  
  next()
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        stackId: string
        email: string
      }
    }
  }
}
