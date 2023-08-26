import jwt from "jsonwebtoken";

export const generateToken = user => {
    const token = jwt.sign({ user }, "secret", {expiresIn: "24h" })
    return token
}

export const authToken = (req, res, next) => {
    let token = req.headers.auth
    if(!token) token = req.signedCookies["mysecretjwt"]
    if(!token) return res.status(401).json({ error: "Not Auth" })
    jwt.verify(token, "secret", (error, credentials) => {
        if(error) return res.status(403).json({ error: "Not Authorized" })
        console.log(credentials)
        req.user = credentials.user
        next()
    })
}