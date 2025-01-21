import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import axiosInstance from "../axios/axiosInstance"
import Navbar from "../components/Navbar"

const Dashboard = () => {

  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {

    const fetchAllUsers = async () => {
      try {
        const responsePromise = axiosInstance.get('/allUsers')
        toast.promise(responsePromise, {
          loading: "Fetching All Users",
          success: "Fetched All Users Successfully",
          error: (err) => err?.response?.data?.message || "Error In Fetching Users"
        })

        const response = await responsePromise
        const allUsers = response?.data?.allUsers
        setAllUsers(allUsers)

      } catch (err) {
        console.log("Error", err.message)
      }
    }
    fetchAllUsers()
  }, [])

  return (
    <div>

      <div className="flex min-h-screen flex-col items-center bg-[#2D2D2D] px-12 pb-32 pt-8">
      <Navbar/>
        {allUsers?.map((user) => (
          <>
            <div id="user" className="h-content my-3 flex w-full flex-wrap justify-start rounded-md bg-white px-5 py-2">
              <div className="mb-8 mr-16 flex flex-col flex-wrap items-start justify-center gap-y-3">
                <p className="text-2xl font-bold">{user?.name}</p>
                <p>{user?.social}</p>
              </div>
              <div id="images" className="flex flex-wrap gap-x-5 gap-y-2 ">
                {user?.images?.map(image =>
                  <div key={image?.public_id} className="h-24 w-24 border border-dashed border-black">
                    <img src={image?.secure_url} alt="image" className="h-24 w-24 " />
                  </div>
                )}
              </div>
            </div>
          </>
        ))}
      </div>

    </div>
  )
}

export default Dashboard