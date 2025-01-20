const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
    try {
        console.log('Cookies:', req.cookies);
        // Get token from multiple sources
        let token = req.cookies.token || 
                   (req.headers.authorization && req.headers.authorization.replace('Bearer ', '')) || 
                   req.body.token;

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication token is required'
            });
        }

        // Verify token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Invalid or expired token'
                });
            }
            
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};