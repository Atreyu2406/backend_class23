import passport from "passport";
import jwt from "passport-jwt"

const jwtStrategy = jwt.Strategy
const extractJwt = jwt.ExtractJwt

const cookieExtractor = req => {
    const token = (req && req.signedCookies) ? req.signedCookies["mysecretjwt"] : null
    return token
}

const inicializePassport = () => {
    passport.use("jwt", new jwtStrategy({
        jwtFromRequest: extractJwt.fromExtractors([]),
        secretOrKey: "secret"
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch(err) {
            return done(err)
        }
    }))
}

export default inicializePassport