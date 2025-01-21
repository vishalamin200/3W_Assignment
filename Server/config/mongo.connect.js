import mongoose from 'mongoose'

const connectMongo = async ()=>{
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected sucessfully ",connection.name) 
    } catch (error) {
        console.log("Error In Database connection")
        process.exit(1)
    }
}

export default connectMongo