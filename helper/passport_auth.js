const passportJwt = require('passport-jwt');
const config=require('config');
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const db=require('../startup/db');
const User = db.user;

module.exports = (passport) => {
    passport.use(
        new StrategyJwt({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('jwtPrivateKey')
        },
            async (jwtPayload, cb) => {
                await User.findOne({ where: { email: jwtPayload.email } }).then((user) => {
                    return cb(null, user);
                }).catch((error) => {
                    return cb(error);
                })
            })
    );
}
