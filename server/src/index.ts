import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoDB.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'

const port = process.env.PORT || 5000
const app = express()

// middlewares
app.use(cors({
    origin: [process.env.CORS_ORIGIN || ""],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
    exposedHeaders: ["Set-Cookie"]
}))
app.use(express.json({limit: '50mb'}))
app.use(cookieParser())

// routes
app.get('/', (req, res) => {
    res.send("hello world")
})
app.use('/auth', authRoutes)
app.use('/buisness', productRoutes)

const startServer = async() => {
    try {
        connectDB()
        app.listen(port, () => {
            console.log(`server is listening on http://localhost:${port}`);
        })
    } catch(err) {
        console.error(err)
    }
}

startServer()