import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Model() {
    const [user, setUser] = useState({ userAllData: {}, imageUrl: "No Image" });
    const navigate = useNavigate()
  

    useEffect(() => {
        async function data() {
            const userdata = await axios.get("http://localhost:8520/user/myprofile", {
                headers: {
                    "token": localStorage.getItem('token')
                }
            })
            // setUser(userdata.data.data[0])
            setUser({ userAllData: userdata.data.data[0], imageUrl: userdata.data.data[0].image.url })

        }
        data()

    }, [])

    return (
        <>
            <div className="flex justify-end">
                <div className="bg-violet-100 max-w-64 h-full  rounded-l-2xl">
                    <p className=" p-2 text-center font-semibold text-2xl mt-5"> Careers<span className="text-violet-900">.com</span></p>
                    <div className="p-5 text-zinc-800">
                        <img className="w-20 h-20 rounded-full" src={`${user.imageUrl}`} />
                        <p className="text-xl mt-1.5 font-bold">{user.userAllData.name}</p>
                        <p className="text font-semibold">{user.userAllData.city}</p>
                        <p className="text-xs text-zinc-700 mt-1 font-semibold">JAVA + DSA | C/C++ | Javascript | Typescript | Nodejs | Reactjs | HTML | CSS/Tailwind CSS | Bootstrap | Figma | MySQL | Mongodb | Worked as Intern at Pninfosys.</p>
                    </div>

                    <hr className="text-zinc-400 ml-5 mr-8"/>
                    <div className="pl-6 text-zinc-800">
                        <h1 className="text-xl mt-2 font-semibold">Account</h1>
                        <div className="text-zinc-700 font-semibold mt-2 ">
                            <p className="mt-1.5">View Profile</p>
                            <p className="mt-1.5">Edit Profile</p>
                            <p className="mt-1.5">My Application</p>
                            <p className="mt-1.5">Setting</p>
                            <p onClick={()=>{
                                localStorage.removeItem("token")
                                alert("logout successfully")
                                navigate('/')
                            }} className="cursor-pointer mt-1.5">Sign Out</p>
                        </div>
                    </div>


                    <hr className="text-zinc-400 ml-5 mt-5 mr-8"/>
                    <div className="pl-6 text-zinc-800">
                        <h1 className="text-xl mt-2 font-semibold">Manage</h1>
                        <div className="text-zinc-700 font-semibold mt-2 ">
                            <p className="mt-1.5">Jobs</p>
                            <p className="mt-1.5">Internships</p>
                            <p className="mt-1.5">Activity</p>
                        </div>
                    </div>
                    <p className="mt-5"></p>
                </div>
            </div>
        </>
    )
}