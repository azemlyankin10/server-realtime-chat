const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    console.log('check auth');
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authenticate;
