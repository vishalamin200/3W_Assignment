import app from './app.js'
import cloudinary from 'cloudinary'
const PORT = process.env.PORT

//configure cloudinary
cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})