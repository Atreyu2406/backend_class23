import express from "express"
import jwtRouter from "./routers/jwt.router.js"
import handlebars from "express-handlebars"
import cookieParser from "cookie-parser"
import passport from "passport"
import inicializePassport from "./config/passport.config.js"

const app = express()

app.use(express.json())

//Cookie configuration
app.use(cookieParser("secret"))

//Passport
inicializePassport()
app.use(passport.initialize())

//Handlebars configuration
app.engine("handlebars", handlebars.engine())
app.set("views", "./src/views")
app.set("view engine", "handlebars")

app.use("/jwt", jwtRouter)
app.get("/login", (req, res) => {
    res.render("index")
})

app.listen(8080, () => console.log("Server Up!"))