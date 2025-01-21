import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

import Navbar from "../components/Navbar"


const UserForm = () => {
    const [userInfo, setUserInfo] = useState({ name: null, social: null, images: null })


    const handleInputChange = (e) => {
        const { name, value } = e.target

        setUserInfo((userInfo) => ({
            ...userInfo,
            [name]: value
        }))
    }

    const hanldeFileUpload = (e) => {
        const inputFiles = e.target.files
        const name = e.target.name
        const files = Array.from(inputFiles)
        setUserInfo((userInfo) => ({
            ...userInfo,
            [name]: files
        }))
    }

    const handleSubmit = (e) => {

        e.preventDefault()
        if (!userInfo?.name) {
            return toast.error("Name is Required")
        }
        if (!userInfo?.social) {
            return toast.error("Social Media Is Required")
        }
        if (!userInfo?.images || userInfo?.images?.length === 0) {
            return toast.error("Atleast 1 Image Should be Attached")
        }

        const formData = new FormData()
        Array.from(userInfo.images).forEach((file) => {
            formData.append('images', file)
        })

        formData.append('name', userInfo?.name)
        formData.append('social', userInfo?.social)
        console.log("formData", formData)
        console.log("UserINfo", userInfo)

        try {
            const responsePromise = axios.post('https://aws-vishal.mooo.com/api/submit', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            toast.promise(responsePromise, {
                loading: "Form Is Submitting...",
                success: "Form Submitted Successfully",
                error: (err) => err?.response?.data?.message
            })

        } catch (error) {
            console.log("Error", error.message)
            return
        }
    }

    return (
        <div className="flex h-screen flex-col items-center  gap-y-8 bg-[#2D2D2D] pt-8 ">
            <Navbar />

            <form onSubmit={handleSubmit} className="h-content  flex w-9/12 flex-col gap-y-6 bg-white px-12 pb-10 pl-12 pt-6 shadow-md shadow-black ">
                <p className="text-3xl font-bold">User Submission Form</p>

                <div id="user-name" className="flex flex-col gap-y-1">
                    <p className="text-lg">Name</p>
                    <div id="name-input" className=" h-10 w-full rounded-md border-2">
                        <input onChange={handleInputChange} type="text" name="name" id="name" className="h-full w-full px-2 text-lg outline-none" />
                    </div>
                </div>
                <div id="user-social" className="flex flex-col gap-y-1">
                    <p className="text-lg">Social Media Handle</p>
                    <div id="social" className=" h-10 w-full rounded-md border-2 ">
                        <input onChange={handleInputChange} type="text" name="social" id="social" className="h-full w-full px-2 text-lg outline-none" />
                    </div>
                </div>
                <div id="images" className="flex flex-col gap-y-1">
                    <p className="text-lg">Upload Images</p>
                    <input onChange={hanldeFileUpload} type="file" multiple accept="image/*" name="images" id="images" className=" w-full  border-2  text-lg outline-none" />
                </div>
                <button type="submit" className="mt-5 h-10 w-24 rounded-lg bg-[#0C6EFD] font-semibold text-white  ">Submit</button>
            </form>

        </div>
    )
}

export default UserForm