const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.isAdminAuthenticated = (req, res, next) => {
    try {
        // Get token from multiple sources
        let token = req.cookies.admintoken || 
                   (req.headers('authorization') && req.headers('authorization').replace('Bearer ', '')) || 
                   req.body.admintoken;

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication token is required'
            });
        }

        // Verify token
        jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err, _) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Invalid or expired token'
                });
            }
            
            next();
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Authentication error'
        });
    }
};