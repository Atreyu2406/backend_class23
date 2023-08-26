import { Router } from "express";
import { authToken, generateToken } from "../utils.js";
import passport from "passport";

const router = Router()

const users = [
    { email: "admin@hotmail.com", password: "admin", rol: "admin" },
    { email: "user@hotmail.com", password: "user", rol: "user" }
]

router.post("/register", (req, res) => {
    const user = req.body
    if(users.find(item => item.email === user.email)) return res.status(400).json({ status: "error", error: "User already exists" })
    users.push(user)
    const access_token = generateToken(user)
    res.json({ status: "success", access_token })
})

router.post("/login", (req, res) => {
    const { email, password } = req.body
    const user = users.find(item => item.email === email && item.password === password)
    if(!user) return res.status(400).json({ status: "error", error: "Invalid credentials" })
    const access_token = generateToken(user)
    // res.json({ status: "success", access_token })
    res.cookie("mysecretjwt", access_token, { signed: true }).json({ status: "success" })
})

router.get("/private", passport.authenticate("jwt", { session: false }), (req, res) => {
    if(req.user.rol === "admin") return res.json({ status: "success", payload: req.user })
    return res.json({ status: "error", error: "No tienes los permisos"})
})

export default router