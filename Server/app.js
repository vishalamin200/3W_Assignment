import dotenv from 'dotenv'
import connectMongo from './config/mongo.connect.js'
import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.routes.js'

//configure dot env
dotenv.config()

// database connection
connectMongo()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//allow request from all domains
app.use(cors())

// Routes
app.use('/api/',userRoutes)


//check server
app.get('/',(req,res)=>{
    res.json({
        message:"Server is running perfectly"
    })
})


export default app


