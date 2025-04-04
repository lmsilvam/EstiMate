// backend/middleware/auth.mjs
export default function authMiddleware(req, res, next) {
    const clientPassword = req.headers['x-estimate-password'];
    const requiredPassword = process.env.ESTIMATE_PASSWORD;
  
    if (!requiredPassword || clientPassword === requiredPassword) {
      return next();
    }
  
    return res.status(401).json({ error: 'Unauthorized. Invalid password.' });
  }