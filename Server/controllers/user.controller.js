import cloudinary from 'cloudinary'
import UserModel from '../models/user.model.js'
import fs from 'fs'

const formSubmission = async (req,res,next)=>{
    try {    
        const {name,social} = req.body
    
        if(!name){
            return res.status(400).json(
                {
                    success:false,
                    message:"Name Is Missing",
                }
            )
        }
    
        if(!social){
            return res.status(400).json(
                {
                    success:false,
                    message:"Social Media Account Is Missing",
                }
            )
        }
    
        if(!req?.files || req?.files?.length === 0){
            return res.status(400).json(
                {
                    success:false,
                    message:"No Image Attached",
                }
            )
        }


        try {  
            //store the images in cloudinary

            const uploadImagesPromises = req?.files?.map(file => {
                return cloudinary.v2.uploader.upload(file?.path,{
                    folder:"3W_User_Images",
                    context:{alt:"user_images"}
                })
            })
        
            const results = await Promise.all(uploadImagesPromises)
         
    
           const images = results.map((result)=>({
                public_id: result?.public_id, 
                secure_url: result?.secure_url
            }))

            // Now create a user, because there is no error yet,
          

            const newUser = await UserModel.create({
                name,
                social,
                images
            })
        
            // save the newUser and sent it to the frontend
            const userInfo = await newUser?.save()

            // remove the images from the temporary storage
            req?.files?.map(file => fs.rmSync(file?.path))
        
            return res.status(200).json({
                success:true,
                message:"User Created Successfully",
                data: userInfo
            })
        } catch (err) {
            return res.status(400).json({
                success:false,
                message:"Error In Uploading Images To Cloudinary",
                error:err?.message
            }) 
        }
    } catch (err) {
        return res.status(400).json({
            success:false,
            message:"Error In Form Submission",
            error:err?.message
        })
    }
}

const allUsers = async (req,res,next)=>{
    try {
        const allUsersInfo = await UserModel.find().select("name social images")
        return res.status(200).json({
            success:true,
            messsage:"Fetch All Users Successfully",
            allUsers:allUsersInfo,
        })
        
    } catch (err) {
        return res.status(400).json({
            success:false,
            message:"Error In fetching all users",
            error:err?.message
        })
        
    }
}


export {formSubmission, allUsers}


