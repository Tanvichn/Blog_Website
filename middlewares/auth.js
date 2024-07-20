const User = require('../models/User');

const authenicateUser =
    async (req, res, next) => { 
        if (req.session.userId) {
            const user = await User.findById(req.session.userId);
            if (user) {
                res.redirect('/');
            } else {
            next();
        } }  else {
            next();
        }
    };

module.exports = authenicateUser;