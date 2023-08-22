const express = require("express")
const app = express()
require("dotenv").config({ path: "./config.env" })
const cors = require("cors")
const connection = require("./db")
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")

// database connection
connection()

// middlewares
app.use(express.json())
app.use(cors())

// routes
app.use("/api", userRoutes)
app.use("/api", authRoutes)

app.get("/", async (req, res) => {
	try {
		res.status(201).send({ message: "User created successfully" })
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" })
	}
})

const port = process.env.PORT || 8080
app.listen(port, console.log(`Listening on port ${port}...`))
