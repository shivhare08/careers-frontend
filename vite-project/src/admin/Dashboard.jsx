import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import JobAddModal from "./JobAddModal";

export default function Dashboard() {

    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const [page, setPage] = useState("jobs");
    const [modalopen, setModalopen] = useState(false)

    useEffect(() => {
        async function data() {
            const adminData = await axios.get("https://careers-backend-m1xp.onrender.com/admin/myprofile", {
                headers: {
                    "token": localStorage.getItem('token')
                }
            })
            setData(adminData.data.data[0])
        }

        data();
    }, [])

    const design = "text-violet-600"
    return (
        <>
            <div className="bg-gray-100 h-full w-full flex justify-center">
                <div className={`${modalopen ? "bg-neutral-600" : "bg-white"} w-full sm:w-4xl h-full`}>
                    <div>
                        <p className=" p-2 text-center text-2xl mt-5">Careers<span className="text-violet-900">.com</span></p>
                        <p className="text-center text-base sm:text-xl mt-5"><span className="font-semibold">{data.name}</span>, Your dashboard</p>
                    </div>

                    <div className="flex justify-center cursor-pointer mt-3 text-gray-700">
                        <div onClick={() => {
                            setPage("jobs")
                        }} className="bg-gray-100 text-center text-sm sm:text-base font-semibold p-3 w-32 h-12">
                            <h1 className={`${page == "jobs" ? design : null}`}>Jobs</h1>
                        </div>


                        <div onClick={() => {
                            setPage("users")
                        }} className="bg-gray-50 text-center  text-sm sm:text-base font-semibold p-3 w-32 h-12 ">
                            <h1 className={`${page == "users" ? design : null}`}>Users</h1>
                        </div>


                        <div onClick={() => {
                            setPage("profile")
                        }} className="bg-gray-100 text-center text-sm sm:text-base font-semibold p-3 w-32 h-12 ">
                            <h1 className={`${page == "profile" ? design : null}`}>Profile</h1>
                        </div>


                        <div onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/admin/signin")
                        }} className="bg-gray-50 text-center text-sm sm:text-base font-semibold p-3 w-32 h-12 ">
                            <h1>Logout</h1>
                        </div>
                    </div>

                    {/* <div className=""> */}

                    <div className="flex justify-center">
                        <div className="w-72 sm:w-96">
                            <div className="mt-4 flex justify-center">
                                {modalopen ? null : <button onClick={() => {
                                    setModalopen(x => !x)
                                }} className="bg-violet-600 text-white p-2 w-full rounded">+ Add job</button>}

                                {modalopen ?
                                    <div className="w-full sm:w-screen h-full bg-gray-200 rounded">
                                        <div className="flex justify-between pl-8 pr-8 p-3">
                                            <h1 className="text-center text-zinc-700 font-semibold">Add job</h1>
                                            <h2 onClick={() => {
                                                setModalopen(x=>!x)
                                            }} className="cursor-pointer text-red-700">
                                                {modalopen?"❌":null}
                                            </h2>
                                        </div>
                                        <JobAddModal />
                                        <br />
                                    </div>
                                    : null}
                            </div>

                            {page == "jobs" ? <div>
                                {/* {data.name?<Users/>:<Loader/>} */}
                                {/* <Addjob/> */}
                                <Jobs />
                            </div> : null}
                        </div>
                    </div>


                    <div className="flex ml-5 sm:ml-48">
                        {page == "users" ? <div>
                            {/* {data.name?<Users/>:<Loader/>} */}
                            <Users />
                        </div> : null}
                    </div>

                    {/* </div> */}
                    <div className="mt-6">
                        <p className=" p-2 text-xs sm:text-base text-center mt-5">2025 Careers<span className="text-violet-900">.com</span>. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </>
    )
}



function Jobs() {

    const [job, setJob] = useState([]);
    useEffect(() => {
        async function data() {
            const alljobs = await axios.get("https://careers-backend-m1xp.onrender.com/careers/jobs", {
                headers: {
                    "token": localStorage.getItem('token')
                }
            });
            setJob(alljobs.data)
        }
        data();
    }, [])

    return (
        <>
            {/* <h1 className="text-center mt-5 sm:text-2xl font-semibold text-gray-800">All jobs</h1> */}
            {job.map(({ title, description, _id, experience, courses, location, aggrement, salary, createdAt }) =>
                <div key={_id} className="">
                    <div className="w-full  h-fit mt-2 p-2 shadow-xs border-b-0.5">
                        <h1 className="text-base">{createdAt}</h1>
                        <h1 className="text-xs">job id - {_id}</h1>
                        <h1 className="font-bold text-xl sm:text-2xl">{title} -{location}</h1>
                        <h1 className="text-[12px] sm:text-xs">{description}</h1>
                        <h1 className="text-base sm:text-xl">batches - {courses}</h1>
                        <h1 className="text-base sm:text-xl">experience - {experience}</h1>
                        <h1 className="text-base sm:text-xl">job location - {location}</h1>
                        <h1 className="text-base sm:text-xl">aggrement - {aggrement}</h1>
                        <h1 className="text-base sm:text-xl">salary - {salary}</h1>

                    </div>
                </div>
            )}
        </>
    )
}

function Users() {
    const [user, setUser] = useState([]);
    useEffect(() => {
        async function data() {
            const allusers = await axios.get("https://careers-backend-m1xp.onrender.com/admin/allusers", {
                headers: {
                    "token": localStorage.getItem("token")
                }
            });
            setUser(allusers.data.data)
        }
        data();
    }, [])

    return (
        <>
            <h1 className=" mt-5 sm:text-2xl font-semibold text-gray-800">All users</h1>

            {user.map(({ name, phone, _id, city, image }) =>
                <div key={_id}>
                    <div className="w-full h-fit mt-4 p-2 shadow-xs border-b-0.5">
                        <div className="flex flex-col justify-center">
                            <h1 className="text-base sm:text-xl">
                                <img className="rounded w-14 h-14" src={`${image.url}`} />
                            </h1>
                            <h1 className="text-base sm:text-xl">{name}</h1>
                        </div>
                        <div className="">
                            <h1 className="text-base">id-{_id}</h1>
                            <h1 className="text-[12px] sm:text-base">{phone}</h1>
                            <h1 className="text-base sm:text-base">location - {city}</h1>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

function Profile() {
    return (
        <>
            <h1>profile</h1>
        </>
    )
}

// function Addjob() {
//     return (
//         <>
//             <button className="bg-violet-600 text-white p-2 w-full rounded">+ Add job</button>
//         </>
//     )
// }